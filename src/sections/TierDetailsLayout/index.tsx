import React, { FC } from 'react';
import './tierDetailsLayout.scss';

const TierDetailsLayout: FC = ({ children }) => {
  return (
    <div className="tierDetailsWrapper">
      <div className="tierOutline">{children}</div>
    </div>
  );
};

export default TierDetailsLayout;
