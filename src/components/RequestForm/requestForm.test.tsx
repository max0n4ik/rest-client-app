import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RequestForm } from './requestForm';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
const t = (key: string) => key;
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return { ...actual, useTranslation: () => ({ t }), I18nextProvider: actual.I18nextProvider };
});
let params = new URLSearchParams();
const setSearchParams = vi.fn((newParams) => {
  params = newParams;
});
vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return { ...actual, useSearchParams: () => [params, setSearchParams] };
});
function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      {' '}
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>{' '}
    </MemoryRouter>
  );
}
describe('RequestForm', () => {
  let onSend: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    onSend = vi.fn();
    params = new URLSearchParams();
    setSearchParams.mockClear();
  });
  it('renders method select and url input', () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    expect(screen.getAllByText('GET')[0]).toBeInTheDocument();
    expect(screen.getByLabelText('endpointUrl')).toBeInTheDocument();
  });
  it('renders headers section and add header button', () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    expect(screen.getByText('headers')).toBeInTheDocument();
    expect(screen.getByText('addHeader')).toBeInTheDocument();
  });
  it('adds and removes header fields', async () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    fireEvent.click(screen.getByText('addHeader'));
    expect(screen.getAllByPlaceholderText('key').length).toBe(2);
    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(screen.getAllByPlaceholderText('key').length).toBe(1);
  });
  it('disables submit if form is invalid', () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    const submit = screen.getByRole('button', { name: 'send' });
    expect(submit).toBeDisabled();
  });
  it('enables submit if form is valid', async () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    fireEvent.change(screen.getByLabelText('endpointUrl'), { target: { value: 'https://example.com' } });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'send' })).not.toBeDisabled();
    });
  });
  it('calls onSend and setSearchParams on submit', async () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    fireEvent.change(screen.getByLabelText('endpointUrl'), { target: { value: 'https://example.com' } });
    const submit = await screen.findByRole('button', { name: 'send' });
    await waitFor(() => expect(submit).not.toBeDisabled());
    fireEvent.click(submit);
    await waitFor(() => {
      expect(onSend).toHaveBeenCalledWith('https://example.com', 'GET', expect.any(Object), '');
      expect(setSearchParams).toHaveBeenCalled();
    });
  });
  it('renders generated code block', () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    expect(screen.getByText('generatedCodeRequest')).toBeInTheDocument();
    expect(screen.getByText(/"method":/)).toBeInTheDocument();
  });
  it('parses search params for method, url, body, headers', () => {
    params = new URLSearchParams();
    params.set('method', 'post');
    params.set('url', btoa('https://foo.com'));
    params.set('body', btoa('{"foo":"bar"}'));
    params.set('header_X-Test', 'abc');
    renderWithProviders(<RequestForm onSend={onSend} />);
    expect(screen.getByDisplayValue('https://foo.com')).toBeInTheDocument();
    expect(screen.getAllByText('POST')[0]).toBeInTheDocument();
    fireEvent.mouseDown(screen.getAllByText('POST')[0]);
    expect(screen.getByPlaceholderText('JSON body')).toHaveValue('{"foo":"bar"}');
    expect(screen.getByDisplayValue('X-Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('abc')).toBeInTheDocument();
  });
});
