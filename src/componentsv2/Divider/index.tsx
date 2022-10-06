import React, { FC } from 'react';

interface IDividerProps {
  className?: string;
}
const Divider: FC<IDividerProps> = ({ className }) => {
  return <div className={className ? className : 'h-0.5 w-full bg-coolGray'} />;
};

export default Divider;
