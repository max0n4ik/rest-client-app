import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import History from './History';
import { MemoryRouter } from 'react-router';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (key === 'method' && opts?.method) return `Method: ${opts.method}`;
      if (key === 'title') return 'History Title';
      if (key === 'empty') return 'No history found';
      if (key === 'button') return 'Go to REST Client';
      if (key === 'endpointUrl') return 'Endpoint URL';
      if (key === 'response') return 'Response';
      return key;
    },
  }),
}));

vi.mock('@/components/ui/textarea', () => ({
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { id?: string }) => (
    <textarea {...props} data-testid={props.id} />
  ),
}));

describe('History component', () => {
  type HistoryItem = {
    method: string;
    timestamp: string;
    url: string;
    data: unknown;
  };

  type LoaderData = {
    data: HistoryItem[];
  };

  const renderComponent = (loaderData: LoaderData) =>
    render(
      <MemoryRouter>
        <History loaderData={loaderData} />
      </MemoryRouter>
    );

  it('renders empty state when no history', () => {
    renderComponent({ data: [] });
    expect(screen.getByText('No history found')).toBeInTheDocument();
    expect(screen.getByText('Go to REST Client')).toBeInTheDocument();
  });

  it('renders history items', () => {
    const loaderData = {
      data: [
        {
          method: 'GET',
          timestamp: '2024-06-01T12:34:56.000Z',
          url: 'https://api.example.com/data',
          data: { foo: 'bar' },
        },
      ],
    };
    renderComponent(loaderData);

    expect(screen.getByText('History Title')).toBeInTheDocument();
    expect(screen.getByText('Method: GET')).toBeInTheDocument();
    expect(screen.getByText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByText('Response')).toBeInTheDocument();
    expect(screen.getByTestId('endpoint-0')).toHaveValue('https://api.example.com/data');
    expect(screen.getByTestId('response-0')).toHaveValue(JSON.stringify({ foo: 'bar' }, null, 2));
  });

  it('renders multiple history items', () => {
    const loaderData = {
      data: [
        {
          method: 'POST',
          timestamp: '2024-06-01T12:34:56.000Z',
          url: 'https://api.example.com/post',
          data: { a: 1 },
        },
        {
          method: 'DELETE',
          timestamp: '2024-06-02T13:00:00.000Z',
          url: 'https://api.example.com/delete',
          data: { b: 2 },
        },
      ],
    };
    renderComponent(loaderData);

    expect(screen.getByText('Method: POST')).toBeInTheDocument();
    expect(screen.getByText('Method: DELETE')).toBeInTheDocument();
    expect(screen.getByTestId('endpoint-0')).toHaveValue('https://api.example.com/post');
    expect(screen.getByTestId('endpoint-1')).toHaveValue('https://api.example.com/delete');
    expect(screen.getByTestId('response-0')).toHaveValue(JSON.stringify({ a: 1 }, null, 2));
    expect(screen.getByTestId('response-1')).toHaveValue(JSON.stringify({ b: 2 }, null, 2));
  });
});
