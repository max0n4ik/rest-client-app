import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LoginPage from './Login';
vi.mock('@/components/Login/login-form', () => ({ default: () => <div data-testid="login-form" /> }));
const resources = { login: { or: 'or', haveNoAccount: 'No account?', signUp: 'Sign up' } };
const mockI18n = i18n.createInstance();
mockI18n.init({ lng: 'en', resources: { en: { login: resources.login } }, fallbackLng: 'en' });
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({ t: (key: keyof typeof resources.login) => resources.login[key] || key }),
  };
});
function renderLoginPage() {
  return render(
    <I18nextProvider i18n={mockI18n}>
      {' '}
      <MemoryRouter>
        {' '}
        <LoginPage />{' '}
      </MemoryRouter>{' '}
    </I18nextProvider>
  );
}
describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders the LoginForm component', () => {
    renderLoginPage();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
  it('renders the "or" separator', () => {
    renderLoginPage();
    expect(screen.getByText('or')).toBeInTheDocument();
  });
  it('renders the registration link', () => {
    renderLoginPage();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute('href', '/registration');
  });
  it('renders the "No account?" text', () => {
    renderLoginPage();
    expect(screen.getByText('No account?')).toBeInTheDocument();
  });
  it('renders the RESTify link in the image section', () => {
    renderLoginPage();
    expect(screen.getByText('RESTify')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'RESTify' })).toHaveAttribute('href', '/');
  });
  it('renders the login image with correct src and alt', () => {
    renderLoginPage();
    const img = screen.getByAltText('export') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('images/login-mountains.jpg');
  });
});
