import React, { FC } from 'react';
import './tierHeader.scss';

interface TierHeaderIPorps {
  title: string;
  image: string;
}

const TierHeader: FC<TierHeaderIPorps> = ({ title, image }: TierHeaderIPorps) => {
  return (
    <div className="tierHeaderWrapper">
      <div className="iconWrapper">
        <img src={image} alt="Campaign Engagement" />
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default TierHeader;
