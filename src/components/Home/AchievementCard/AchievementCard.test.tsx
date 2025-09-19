import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AchievementCard from './AchievementCard';

describe('AchievementCard', () => {
  it('renders the description', () => {
    render(<AchievementCard icon={<svg data-testid="icon" />} description="Test achievement description" />);
    expect(screen.getByText('Test achievement description')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<AchievementCard icon={<svg data-testid="icon" />} description="Icon test" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies correct classes to the root element', () => {
    render(<AchievementCard icon={<span />} description="Class test" />);
    const li = screen.getByText('Class test').closest('li');
    expect(li).toHaveClass('card', 'flex', 'flex-col', 'items-center', 'gap-4');
  });

  it('applies correct classes to the icon container', () => {
    render(<AchievementCard icon={<span data-testid="icon" />} description="Icon container test" />);
    const iconContainer = screen.getByTestId('icon').parentElement;
    expect(iconContainer).toHaveClass(
      'flex',
      'h-[197px]',
      'w-[197px]',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-[#A8D0E6]',
      'shadow-lg'
    );
  });
});
