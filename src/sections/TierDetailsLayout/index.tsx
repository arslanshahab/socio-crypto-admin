import React, { FC } from 'react';
import './tierDetailsLayout.scss';

const TierDetails: FC = ({ children }) => {
  return (
    <div className="tierDetailsWrapper">
      <div className="tierOutline">{children}</div>
    </div>
  );
};

export default TierDetails;
