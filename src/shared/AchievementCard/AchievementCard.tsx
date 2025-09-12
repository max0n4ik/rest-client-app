import type { JSX } from 'react';

interface AchievementCardProps {
  icon: JSX.Element;
  description: string;
}

const AchievementCard = ({ icon, description }: AchievementCardProps): JSX.Element => {
  return (
    <li className="card flex flex-col items-center gap-4">
      <div
        style={{
          width: 197,
          height: 197,
          backgroundColor: '#A8D0E6',
          borderRadius: '50%',
          boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon}
      </div>
      {description}
    </li>
  );
};

export default AchievementCard;
