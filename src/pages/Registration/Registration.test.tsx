import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Registration from './Registration';
vi.mock('@/components/Signin/registration-form', () => ({ default: () => <div data-testid="registration-form" /> }));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        or: 'or',
        haveAccount: 'Already have an account?',
        signIn: 'Sign In',
      };
      return translations[key] || key;
    },
  }),
}));
describe('Registration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders RegistrationForm', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    expect(screen.getByTestId('registration-form')).toBeInTheDocument();
  });
  it('renders "or" separator', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    expect(screen.getByText('or')).toBeInTheDocument();
  });
  it('renders "Already have an account?" text', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });
  it('renders "Sign In" link to /login', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const signInLink = screen.getByText('Sign In');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest('a')).toHaveAttribute('href', '/login');
  });
  it('renders RESTify link to home on large screens', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const restifyLink = screen.getByText('RESTify');
    expect(restifyLink).toBeInTheDocument();
    expect(restifyLink.closest('a')).toHaveAttribute('href', '/');
  });
  it('renders background image with correct alt', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const img = screen.getByAltText('export');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'images/login-mountains.jpg');
  });
});
