import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        text: 'Created by',
        dmitriy: 'Dmitriy',
        asya: 'Asya',
        maxim: 'Maxim',
        terms: 'for RS School course',
        link: 'React Course',
        copyright: '© 2024',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders the footer element', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders all contributor links', () => {
    expect(screen.getByText('Dmitriy')).toHaveAttribute('href', 'https://github.com/Darkonic10');
    expect(screen.getByText('Asya')).toHaveAttribute('href', 'https://github.com/asyadanilova');
    expect(screen.getByText('Maxim')).toHaveAttribute('href', 'https://github.com/max0n4ik');
  });

  it('renders the RS School course link', () => {
    expect(screen.getByText('React Course')).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders the copyright', () => {
    expect(screen.getByText('© 2024')).toBeInTheDocument();
  });

  it('renders the static text', () => {
    expect(screen.getByText(/Created by/)).toBeInTheDocument();
    expect(screen.getByText(/for RS School course/)).toBeInTheDocument();
  });
});
