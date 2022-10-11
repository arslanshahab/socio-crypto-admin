import React, { FC } from 'react';
import LineChart from '../../componentsv2/LineChart';
import TierCard from '../../componentsv2/TierCard';
import Campaigns from '../Campaigns';
import './dashboard.scss';

const Dashboard: FC = () => {
  return (
    <div className="dashboardWrapper">
      <div className="dashboardCol">
        <div className="lineChartSection">
          <LineChart />
        </div>
        <div className="tierCardSection">
          <TierCard />
        </div>
        <div className="campaignTableWrapper">
          <Campaigns />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
