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
import { CampaignListVars, PaginatedCampaignResults, UserCampaignSingle } from '../types';
import { GET_ALL_USER_CAMPAIGNS, GET_USER_CAMPAIGN_ANALYTICS } from '../operations/queries/campaign';
import { GetUserAllCampaigns } from './../types';
import BarChart from './BarChart';

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
  const [campaignId, setCamapignId] = useState('-1');

  //! ApolloClient Query Hook
  const { data } = useQuery<GetUserAllCampaigns>(GET_ALL_USER_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 50, sort: true, approved: true, open: true },
    fetchPolicy: 'cache-and-network',
  });
  const { data: userCamapign } = useQuery(GET_USER_CAMPAIGN_ANALYTICS, {
    variables: { id: campaignId },
  });

  //! Use Effect Hook
  useEffect(() => {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);
  //! Handlers
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getCampaingData = () => {
    return [{ name: 'All', id: '-1' }, ...(data?.getUserAllCampaign || [])];
  };
  const getCampaignId = (id: any) => {
    setCamapignId(id);
  };

  //! Card Data
  const statCardData: StateCardDataType[] = [
    {
      title: 'Clicks',
      numbers: `${userCamapign?.getUserCampaign?.hourlyMetrics?.clickCount}`,
      icon: <BsHandIndexThumbFill />,
    },
    {
      title: 'Views',
      numbers: `${userCamapign?.getUserCampaign?.hourlyMetrics?.viewCount}`,
      icon: <FaEye />,
    },
    {
      title: 'Shares',
      numbers: `${userCamapign?.getUserCampaign?.hourlyMetrics?.shareCount}`,
      icon: <BsFillShareFill />,
    },
    {
      title: 'Participation Score',
      numbers: `${userCamapign?.getUserCampaign?.hourlyMetrics?.totalParticipationScore}`,
      icon: <BsFillFileBarGraphFill />,
    },
    {
      title: 'Rewards',
      numbers: `${userCamapign?.getUserCampaign?.hourlyMetrics?.rewards}`,
      icon: <SiCashapp />,
    },
  ];
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
          {getCampaingData().length > 1 && (
            <AutoCompleteDropDown
              options={getCampaingData()}
              label="Campaign"
              getCampaignId={(id) => getCampaignId(id)}
            />
          )}
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
      {campaignId == '-1' ? (
        <div>
          <BarChart
            participationScore={userCamapign?.getUserCampaign?.hourlyMetrics?.participationScore}
            rewards={userCamapign?.getUserCampaign?.hourlyMetrics?.rewards}
          />
        </div>
      ) : (
        <div>
          <LineChart participationScore={userCamapign?.getUserCampaign?.hourlyMetrics?.participationScore} />
        </div>
      )}
    </div>
  );
};

export type StateCardDataType = {
  title: string;
  numbers: string;
  icon: JSX.Element;
};
