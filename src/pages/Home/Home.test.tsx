import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { useAuthStore } from '@/store/AuthState';
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock('@/store/AuthState', () => ({ useAuthStore: vi.fn() }));
vi.mock('@/components/Home/UserCard/UserCard', () => {
  type UserCardProps = { name: string; description: string };
  return {
    default: ({ name, description }: UserCardProps) => (
      <li data-testid="user-card">
        <span>{name}</span> <span>{description}</span>
      </li>
    ),
  };
});
vi.mock('@/components/Home/AchievementCard/AchievementCard', () => {
  type AchievementCardProps = { description: string };
  return {
    default: ({ description }: AchievementCardProps) => (
      <li data-testid="achievement-card">
        <span>{description}</span>
      </li>
    ),
  };
});
describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders authorized home content when user is logged in', () => {
    (useAuthStore as unknown as Mock).mockImplementation((fn: (state: { user: { name: string } | null }) => unknown) =>
      fn({ user: { name: 'Test User' } })
    );
    render(<Home />);
    expect(screen.getByText('homeAuthorized.welcomeTitle')).toBeInTheDocument();
    expect(screen.getByText('homeAuthorized.welcomeText')).toBeInTheDocument();
    expect(screen.getByText('homeAuthorized.projectContributors')).toBeInTheDocument();
    expect(screen.getAllByTestId('user-card')).toHaveLength(3);
    expect(screen.getByText('homeAuthorized.contributor1')).toBeInTheDocument();
    expect(screen.getByText('homeAuthorized.contributor2')).toBeInTheDocument();
    expect(screen.getByText('homeAuthorized.contributor3')).toBeInTheDocument();
  });
  it('renders incognito home content when user is not logged in', () => {
    (useAuthStore as unknown as Mock).mockImplementation((fn: (state: { user: { name: string } | null }) => unknown) =>
      fn({ user: null })
    );
    render(<Home />);
    expect(screen.getByText('homeIncognito.welcomeTitle')).toBeInTheDocument();
    expect(screen.getByText('homeIncognito.welcomeText')).toBeInTheDocument();
    expect(screen.getByText('homeIncognito.projectAchievements')).toBeInTheDocument();
    expect(screen.getAllByTestId('achievement-card')).toHaveLength(3);
    expect(screen.getByText('homeIncognito.historyAchievement')).toBeInTheDocument();
    expect(screen.getByText('homeIncognito.languageAchievement')).toBeInTheDocument();
    expect(screen.getByText('homeIncognito.restAchievement')).toBeInTheDocument();
  });
});
