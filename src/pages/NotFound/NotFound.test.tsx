import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { MemoryRouter } from 'react-router';
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: 'Not Found',
        text: 'The page you are looking for does not exist.',
        button: 'Go Home',
      };
      return translations[key] || key;
    },
  }),
}));
describe('NotFound', () => {
  beforeEach(() => {});
  it('renders the title', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
  it('renders the description text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });
  it('renders the button with correct text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Go Home' })).toBeInTheDocument();
  });
  it('button links to the home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: 'Go Home' });
    expect(link).toHaveAttribute('href', '/');
  });
});
