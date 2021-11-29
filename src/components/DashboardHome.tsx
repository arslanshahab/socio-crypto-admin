import React from 'react';
import StatCard from './StatCard';
import { BsHandIndexThumbFill, BsFillShareFill, BsFillFileBarGraphFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';
import LineChart from './Charts/LineChart';

const statCardData: StateCardDataType[] = [
  {
    title: 'Clicks',
    numbers: '350,897',
    icon: <BsHandIndexThumbFill />,
  },
  {
    title: 'Views',
    numbers: '450,897',
    icon: <FaEye />,
  },
  {
    title: 'Shares',
    numbers: '150,897',
    icon: <BsFillShareFill />,
  },
  {
    title: 'Participation Score',
    numbers: '250,897',
    icon: <BsFillFileBarGraphFill />,
  },
  {
    title: 'Rewards',
    numbers: '250,897',
    icon: <SiCashapp />,
  },
];

const cardType: { [key: number]: string } = {
  0: 'clicksCard',
  1: 'viewsCard',
  2: 'sharesCard',
  3: 'participationsCard',
  4: 'rewardsCard',
};

export const DashboardHome: React.FC = () => {
  return (
    <div>
      <h1 className="text-center py-4 mb-8 text-blue-800 text-4xl font-semibold border-b-2">Campaign Analytics</h1>
      <div className="flex justify-between gap-4 px-4 xs:flex-wrap">
        {statCardData?.map((x, index) => (
          <StatCard key={index} compaignData={x} cardType={cardType[index]} />
        ))}
      </div>
      <div className="py-12">
        <LineChart />
      </div>
    </div>
  );
};

export type StateCardDataType = {
  title: string;
  numbers: string;
  icon: JSX.Element;
};
