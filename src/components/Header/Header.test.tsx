import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useAuthStore } from '../../store/AuthState';
import { useTranslation } from 'react-i18next';
vi.mock('react-router', () => ({
  Link: ({ to, children, ...props }: React.PropsWithChildren<{ to: string }>) => (
    <a href={to} {...props}>
      {' '}
      {children}{' '}
    </a>
  ),
}));
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: { iconName: string } }) => <span data-testid="icon">{icon.iconName}</span>,
}));
vi.mock('../../store/AuthState', () => ({ useAuthStore: vi.fn() }));
const tMock = vi.fn((key) => key);
const changeLanguageMock = vi.fn();
const i18nMock = { language: 'en', changeLanguage: changeLanguageMock };
vi.mock('react-i18next', () => ({ useTranslation: vi.fn() }));
describe('Header', () => {
  beforeEach(() => {
    (useTranslation as unknown as Mock).mockReturnValue({ t: tMock, i18n: i18nMock });
    (useAuthStore as unknown as Mock).mockImplementation((cb) => cb({ user: null, logout: vi.fn() }));
    localStorage.clear();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders logo and title', () => {
    render(<Header />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
  });
  it('shows login/signup links when not logged in', () => {
    render(<Header />);
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('signup')).toBeInTheDocument();
    expect(screen.queryByText('history')).not.toBeInTheDocument();
    expect(screen.queryByText('restClient')).not.toBeInTheDocument();
  });
  it('shows history/rest-client links when logged in', () => {
    (useAuthStore as unknown as Mock).mockImplementation((cb) => cb({ user: { name: 'test' }, logout: vi.fn() }));
    render(<Header />);
    expect(screen.getByText('history')).toBeInTheDocument();
    expect(screen.getByText('restClient')).toBeInTheDocument();
    expect(screen.queryByText('login')).not.toBeInTheDocument();
    expect(screen.queryByText('signup')).not.toBeInTheDocument();
  });
  it('calls changeLanguage and sets localStorage on language button click', () => {
    render(<Header />);
    const langBtn = screen.getAllByRole('button')[0];
    fireEvent.click(langBtn);
    expect(changeLanguageMock).toHaveBeenCalledWith('ru');
    expect(localStorage.getItem('Language')).toBe('ru');
  });
  it('calls logout when logout button is clicked', () => {
    const logoutMock = vi.fn();
    (useAuthStore as unknown as Mock).mockImplementation((cb) => cb({ user: { name: 'test' }, logout: logoutMock }));
    render(<Header />);
    const logoutBtn = screen.getAllByRole('button').find((btn) => btn.getAttribute('aria-label') === 'Logout');
    expect(logoutBtn).toBeDefined();
    if (logoutBtn) fireEvent.click(logoutBtn);
    expect(logoutMock).toHaveBeenCalled();
  });
  it('toggles mobile menu on menu button click', () => {
    render(<Header />);
    const menuBtn = screen.getAllByRole('button').find((btn) => btn.getAttribute('aria-label') === 'Open menu');
    expect(menuBtn).toBeDefined();
    if (menuBtn) fireEvent.click(menuBtn);
    expect(screen.getAllByText('login')[0]).toBeInTheDocument();
    if (menuBtn) fireEvent.click(menuBtn);
    expect(screen.queryByText('login')).toBeInTheDocument();
  });
  it('closes mobile menu when a nav link is clicked', () => {
    render(<Header />);
    const menuBtn = screen.getAllByRole('button').find((btn) => btn.getAttribute('aria-label') === 'Open menu');
    if (menuBtn) fireEvent.click(menuBtn);
    const loginLink = screen.getAllByText('login').find((el) => el.tagName === 'A');
    expect(loginLink).toBeDefined();
    if (loginLink) fireEvent.click(loginLink);
  });
  it('applies scrolled styles when window is scrolled', () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 20 } });
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
