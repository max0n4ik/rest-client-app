import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestfulClient from './restfulClient';
import * as useRestClientModule from '@/hooks/useRestClient';
const useRestClientMock = useRestClientModule.useRestClient as ReturnType<typeof vi.fn>;
interface ResponseViewerProps {
  response?: string;
  error?: string;
  loading?: boolean;
}
vi.mock('@/hooks/useRestClient', () => ({ useRestClient: vi.fn() }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock('@/components/RequestForm/requestForm', () => ({
  RequestForm: ({ onSend }: { onSend?: (data: unknown) => void }) => (
    <button onClick={() => onSend && onSend({})}>Send</button>
  ),
}));
vi.mock('@/components/ResponseViewer/responseViewer', () => ({
  ResponseViewer: ({ response, error, loading }: ResponseViewerProps) => (
    <div>
      {loading && <span>loading...</span>} {error && <span>error: {error}</span>}
      {response && <span>response: {JSON.stringify(response)}</span>}
    </div>
  ),
}));
describe('RestfulClient', () => {
  beforeEach(() => {
    useRestClientMock.mockReset();
  });
  it('renders request and response sections', () => {
    useRestClientMock.mockReturnValue({ loading: false, response: null, error: null, sendRequest: vi.fn() });
    render(<RestfulClient />);
    expect(screen.getByText('request')).toBeInTheDocument();
    expect(screen.getByText('response')).toBeInTheDocument();
  });
  it('renders loading state in ResponseViewer', () => {
    useRestClientMock.mockReturnValue({ loading: true, response: null, error: null, sendRequest: vi.fn() });
    render(<RestfulClient />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  it('renders error state in ResponseViewer', () => {
    useRestClientMock.mockReturnValue({ loading: false, response: null, error: 'Some error', sendRequest: vi.fn() });
    render(<RestfulClient />);
    expect(screen.getByText(/error: Some error/i)).toBeInTheDocument();
  });
  it('renders response in ResponseViewer', () => {
    useRestClientMock.mockReturnValue({
      loading: false,
      response: { data: 'test' },
      error: null,
      sendRequest: vi.fn(),
    });
    render(<RestfulClient />);
    expect(screen.getByText(/response: {"data":"test"}/i)).toBeInTheDocument();
  });
  it('calls sendRequest when RequestForm button is clicked', () => {
    const sendRequest = vi.fn();
    useRestClientMock.mockReturnValue({ loading: false, response: null, error: null, sendRequest });
    render(<RestfulClient />);
    screen.getByText('Send').click();
    expect(sendRequest).toHaveBeenCalled();
  });
});
