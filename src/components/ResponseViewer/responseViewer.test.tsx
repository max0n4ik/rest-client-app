import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponseViewer } from './responseViewer';
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock('@fortawesome/react-fontawesome', () => ({ FontAwesomeIcon: () => <span data-testid="fa-icon" /> }));
const baseResponse = { status: 200, ok: true, data: { message: 'Success', foo: 'bar' } };
describe('ResponseViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders loading state', () => {
    render(<ResponseViewer response={null} loading={true} />);
    expect(screen.getByTestId('fa-icon')).toBeInTheDocument();
    expect(screen.getByText('sending')).toBeInTheDocument();
  });
  it('renders placeholder when no response and no error', () => {
    render(<ResponseViewer response={null} loading={false} />);
    expect(screen.getByText('placeholder')).toBeInTheDocument();
  });
  it('renders error state with error prop', () => {
    render(<ResponseViewer response={null} error="Something went wrong" loading={false} />);
    expect(screen.getByLabelText('status')).toBeInTheDocument();
    expect(screen.getByLabelText('error')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Something went wrong')).toBeInTheDocument();
  });
  it('renders error state with response not ok', () => {
    const errorResponse = { status: 400, ok: false, data: { message: 'Bad Request' } };
    render(<ResponseViewer response={errorResponse} loading={false} />);
    expect(screen.getByLabelText('status')).toBeInTheDocument();
    expect(screen.getByDisplayValue('400')).toBeInTheDocument();
    expect(screen.getByLabelText('error')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bad Request')).toBeInTheDocument();
  });
  it('renders error state with unknown error', () => {
    const errorResponse = { status: 500, ok: false, data: {} };
    render(<ResponseViewer response={errorResponse} loading={false} />);
    expect(screen.getByDisplayValue('Unknown error')).toBeInTheDocument();
  });
  it('renders response data when response is ok', () => {
    render(<ResponseViewer response={baseResponse} loading={false} />);
    expect(screen.getByLabelText('status')).toBeInTheDocument();
    expect(screen.getByDisplayValue('200')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /response/i })).toHaveValue(JSON.stringify(baseResponse.data, null, 2));
  });
});
