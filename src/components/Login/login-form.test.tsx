import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './login-form';
import { useAuthStore } from '@/store/AuthState';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { changeLanguage: () => new Promise(() => {}) } }),
}));
vi.mock('@/store/AuthState', () => ({ useAuthStore: vi.fn() }));
vi.mock('sonner', () => ({ toast: { success: vi.fn() } }));
vi.mock('react-router', () => ({ useNavigate: vi.fn() }));
const mockLogin = vi.fn();
const mockClearError = vi.fn();
const mockNavigate = vi.fn();
beforeEach(() => {
  (useAuthStore as unknown as Mock).mockImplementation((selector) =>
    selector({ login: mockLogin, error: null, clearError: mockClearError, loading: false })
  );
  (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
  vi.clearAllMocks();
});
describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
  });
  it('shows password when toggle button is clicked', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText('password');
    const toggleBtn = screen.getByRole('button', { name: /show password/i });
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  it('calls login and navigates on successful submit', async () => {
    mockLogin.mockResolvedValueOnce(null);
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Password123!' });
      expect(toast.success).toHaveBeenCalledWith('Successfully logged in');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
  it('shows validation errors for invalid fields', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'not-an-email' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      const emailInput = screen.getByLabelText('email');
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
    });
  });
  it('disables submit button when loading or submitting', async () => {
    (useAuthStore as unknown as Mock).mockImplementation((selector) =>
      selector({ login: mockLogin, error: null, clearError: mockClearError, loading: true })
    );
    render(<LoginForm />);
    const button = screen.getByRole('button', { name: /loggingIn/i });
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
});
