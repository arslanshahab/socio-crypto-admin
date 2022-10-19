import React, { FC } from 'react';
import './tierDetails.scss';
import successIcon from '../../assets/svg/tiers/successIcon.svg';

interface TierDetailsIProps {
  image: string;
  title: string;
  value: string;
}

const TierDetails: FC<TierDetailsIProps> = ({ image, title, value }: TierDetailsIProps) => {
  return (
    <div className="tierDetailsWrapper">
      <img src={image} alt="" />
      <div className="tierContent">
        <p>{title}:</p>
        <div className="counts">
          <h3>{value}</h3>
          <div className="successCount">
            <p>+0</p>
            <img src={successIcon} alt="campaign success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierDetails;
