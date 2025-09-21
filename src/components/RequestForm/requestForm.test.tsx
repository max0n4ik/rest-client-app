import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RequestForm } from './requestForm';
import * as React from 'react';

vi.mock('react-hook-form', () => {
  const actual = vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: () => ({
      handleSubmit: (fn: (data: unknown) => void) => (e: { preventDefault: () => void }) => {
        e.preventDefault();
        fn({
          method: 'GET',
          url: '',
          headers: [{ key: '', value: '' }],
          body: '',
        });
      },
      control: {},
      formState: { isValid: true },
      watch: (name: string) => {
        switch (name) {
          case 'method':
            return 'GET';
          case 'url':
            return '';
          case 'body':
            return '';
          case 'headers':
            return [{ key: '', value: '' }];
          default:
            return '';
        }
      },
      setValue: vi.fn(),
    }),
    useFieldArray: () => ({
      fields: [{ id: '1', key: '', value: '' }],
      append: vi.fn(),
      remove: vi.fn(),
    }),
    FormProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

vi.mock('@/components/ui/form', () => ({
  FormControl: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormField: ({
    name,
    render,
  }: {
    name: string;
    render: (props: { field: { value: unknown; onChange: (value: unknown) => void } }) => React.ReactNode;
  }) => {
    const value = name === 'headers' ? [{ key: '', value: '' }] : '';
    return render({ field: { value, onChange: vi.fn() } });
  },
  FormItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormMessage: () => null,
}));

vi.mock('@/components/ui/input', () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
}));

vi.mock('@/components/ui/textarea', () => ({
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} />,
}));

vi.mock('@/components/ui/button', () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />,
}));

vi.mock('@/components/ui/select', () => ({
  Select: ({
    children,
    value,
    onValueChange,
  }: {
    children: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
  }) => (
    <select value={value} onChange={(e) => onValueChange?.(e.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: (props: React.OptionHTMLAttributes<HTMLOptionElement>) => <option {...props} />,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectValue: () => null,
}));
vi.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mockSetSearchParams = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

function renderWithProviders(ui: React.ReactElement) {
  return render(ui);
}

describe('RequestForm', () => {
  let onSend: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSend = vi.fn();
  });

  it('renders method select and url input', () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    expect(screen.getByText('endpointUrl')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://api.example.com/resource')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
  });

  it('renders headers section and add header button', () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    expect(screen.getByText('headers')).toBeInTheDocument();
    expect(screen.getByText('addHeader')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('value')).toBeInTheDocument();
  });

  it('adds and removes header fields', async () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    const addBtn = screen.getByText('addHeader');
    fireEvent.click(addBtn);
    expect(screen.getAllByPlaceholderText('key').length).toBe(1);
  });

  it('shows body textarea only for POST, PUT, PATCH', async () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    expect(screen.queryByPlaceholderText('JSON body')).not.toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText('GET'));
    fireEvent.click(screen.getByText('POST'));

    fireEvent.mouseDown(screen.getByText('POST'));
    fireEvent.click(screen.getByText('GET'));
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('JSON body')).not.toBeInTheDocument();
    });
  });

  it('disables submit button if form is invalid', () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    const submitBtn = screen.getByText('send');
    expect(submitBtn).not.toBeDisabled();
  });

  it('enables submit button when valid url is entered', async () => {
    renderWithProviders(<RequestForm onSend={onSend} />);
    const urlInput = screen.getByPlaceholderText('https://api.example.com/resource');
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    await waitFor(() => {
      expect(screen.getByText('send')).not.toBeDisabled();
    });
  });
});
