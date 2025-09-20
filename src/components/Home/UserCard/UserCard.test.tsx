import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';
describe('UserCard', () => {
  const props = { photo: 'https://example.com/photo.jpg', name: 'Jane Doe', description: 'A passionate developer.' };
  it('renders the user name', () => {
    render(<UserCard {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
  });
  it('renders the user description', () => {
    render(<UserCard {...props} />);
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
  it('renders the user photo with correct src and alt', () => {
    render(<UserCard {...props} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', props.photo);
    expect(img).toHaveAttribute('alt', props.name);
  });
  it('applies correct class names to elements', () => {
    render(<UserCard {...props} />);
    const li = screen.getByRole('listitem');
    expect(li).toHaveClass('flex', 'flex-col', 'items-center', 'text-center');
    const img = screen.getByRole('img');
    expect(img).toHaveClass('mb-4', 'h-[197px]', 'w-[197px]', 'rounded-full', 'object-cover', 'shadow-md');
    const h2 = screen.getByText(props.name);
    expect(h2).toHaveClass('mb-2', 'text-2xl', 'font-semibold');
    const p = screen.getByText(props.description);
    expect(p).toHaveClass('text-base');
  });
});
