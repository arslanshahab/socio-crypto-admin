import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { BsHandIndexThumbFill, BsFillShareFill, BsFillFileBarGraphFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';
import LineChart from './Charts/LineChart';
import SelectField from './SelectField/SelectField';
import DatePicker from './DatePicker';
import { Button } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import AutoCompleteDropDown from './AutoCompleteDropDown';
import { useQuery } from '@apollo/client';
import { CampaignListVars, PaginatedCampaignResults } from '../types';
import { LIST_CAMPAIGNS } from '../operations/queries/campaign';

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
//! Select Fields Data
const searchWithDate = ['7 Days', '15 Days', '30 Days', '60 Days', '90 Days', 'One Year'];

export const DashboardHome: React.FC = () => {
  //! Use State Hook
  const [expanded, setExpanded] = useState(false);
  const [currentDate, setCurrentDate] = useState<string | undefined>();
  const [campaignNames, setCampaignNames] = useState<string[]>([]);

  //! ApolloClient Query Hook
  const { data } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 50, sort: true, approved: true, open: true },
    fetchPolicy: 'cache-and-network',
  });

  //! Use Effect Hook
  useEffect(() => {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    setCurrentDate(`${year}-${month}-${day}`);
    // Get Campaign Names
    const names = data?.listCampaigns?.results?.map((x) => x.name) || [];
    setCampaignNames(names);
  }, [data]);
  //! Handlers
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getCampaingData = () => {
    return ['Select Campaign', ...campaignNames];
  };

  return (
    <div>
      <h1 className="text-center py-4 mb-8 text-blue-800 text-4xl font-semibold border-b-2">Campaign Analytics</h1>
      <div className="flex justify-between gap-4 px-4 xs:flex-wrap">
        {statCardData?.map((x, index) => (
          <StatCard key={index} compaignData={x} cardType={cardType[index]} />
        ))}
      </div>
      <div className="px-4">
        <div className="flex gap-14 flex-wrap mt-12 justify-start">
          <AutoCompleteDropDown options={getCampaingData()} label="Campaign" />
          <SelectField searchFieldData={searchWithDate} title="Select Timeline" />
          <Button variant="contained" color="primary" onClick={handleExpandClick}>
            Custom Date Search
          </Button>
        </div>
        <div>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="flex gap-12 pt-8">
              <DatePicker title="Start" date={currentDate} />
              <DatePicker title="End" date={currentDate} />
            </div>
          </Collapse>
        </div>
      </div>
      <div>
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
