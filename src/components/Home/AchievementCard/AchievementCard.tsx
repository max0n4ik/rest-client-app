import type { JSX } from 'react';

interface AchievementCardProps {
  icon: JSX.Element;
  description: string;
}

const AchievementCard = ({ icon, description }: AchievementCardProps): JSX.Element => {
  return (
    <li className="card flex flex-col items-center gap-4">
      <div className="flex h-[197px] w-[197px] items-center justify-center rounded-full bg-[#A8D0E6] shadow-lg">
        {icon}
      </div>
      {description}
    </li>
  );
};

export default AchievementCard;
