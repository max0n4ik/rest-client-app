import type { JSX } from 'react';
type UserCardProps = { photo: string; name: string; description: string };
const UserCard = ({ photo, name, description }: UserCardProps): JSX.Element => {
  return (
    <li className="flex flex-col items-center text-center">
      {' '}
      <img src={photo} alt={name} className="mb-4 h-[197px] w-[197px] rounded-full object-cover shadow-md" />{' '}
      <h2 className="mb-2 text-2xl font-semibold">{name}</h2> <p className="text-base">{description}</p>{' '}
    </li>
  );
};
export default UserCard;
