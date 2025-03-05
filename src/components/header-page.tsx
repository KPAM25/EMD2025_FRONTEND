import type { FC } from 'react';

interface HeaderPageComponentProps {
  title: string;
}

export const HeaderPageComponent: FC<HeaderPageComponentProps> = ({
  title,
}) => {
  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
    </div>
  );
};
