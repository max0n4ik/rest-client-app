import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from './registration-form';
import { useAuthStore } from '@/store/AuthState';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { changeLanguage: () => new Promise(() => {}) } }),
}));
vi.mock('sonner', () => ({ toast: { success: vi.fn() } }));
vi.mock('react-router', () => ({ useNavigate: vi.fn() }));
vi.mock('@/store/AuthState', () => ({ useAuthStore: vi.fn() }));
vi.mock('../ui/error-message', () => ({ Tooltip: ({ message }: { message: string }) => <div>{message}</div> }));
const registerMock = vi.fn();
const mockNavigate = vi.fn();
describe('RegistrationForm', () => {
  beforeEach(() => {
    (useAuthStore as unknown as Mock).mockImplementation((selector) => selector({ register: registerMock }));
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    vi.clearAllMocks();
  });
  it('renders all fields and submit button', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByLabelText('repeatPassword')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'signUp' })).toBeInTheDocument();
  });
  it('toggles password visibility', () => {
    render(<RegistrationForm />);
    const passwordInput = screen.getByLabelText('password');
    const toggleBtn = screen.getAllByRole('button', { name: /password/i })[0];
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  it('toggles confirm password visibility', () => {
    render(<RegistrationForm />);
    const confirmInput = screen.getByLabelText('repeatPassword');
    const toggleBtn = screen.getAllByRole('button', { name: /password/i })[1];
    expect(confirmInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleBtn);
    expect(confirmInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleBtn);
    expect(confirmInput).toHaveAttribute('type', 'password');
  });
  it('shows error message if registration fails', async () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'w' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('repeatPassword'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /signUp/i }));
    await waitFor(() => {
      expect(screen.getByText('zodValidation:name_min')).toBeInTheDocument();
    });
  });
  it('calls register and navigates on successful submit', async () => {
    registerMock.mockResolvedValueOnce(null);
    const mockNavigate = vi.fn();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('repeatPassword'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /signUp/i }));
    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Password123!', name: 'User' });
      expect(toast.success).toHaveBeenCalledWith('Successfully registered');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
