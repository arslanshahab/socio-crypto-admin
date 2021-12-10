import React, { useState } from 'react';
import StatCard from './StatCard';
import { BsHandIndexThumbFill, BsFillShareFill, BsFillFileBarGraphFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';
import LineChart from './Charts/LineChart';
import { IconButton } from '@mui/material';
import AutoCompleteDropDown from './AutoCompleteDropDown';
import { useQuery } from '@apollo/client';
import { GET_USER_CAMPAIGNS, GET_USER_CAMPAIGN_ANALYTICS } from '../operations/queries/campaign';
import { GetUserCampaigns } from './../types';
import BarChart from './BarChart';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const cardType: { [key: number]: string } = {
  0: 'clicksCard',
  1: 'viewsCard',
  2: 'sharesCard',
  3: 'participationsCard',
  4: 'rewardsCard',
};

export const DashboardHome: React.FC = () => {
  //! Use State Hook
  const [campaignId, setCamapignId] = useState('-1');

  //! ApolloClient Query Hook
  const { data } = useQuery<GetUserCampaigns>(GET_USER_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 50, sort: true, approved: true, open: true },
    fetchPolicy: 'cache-and-network',
  });
  const { data: userCamapign } = useQuery(GET_USER_CAMPAIGN_ANALYTICS, {
    variables: { id: campaignId },
  });

  //! Handlers
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
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.clickCount}`,
      icon: <BsHandIndexThumbFill />,
    },
    {
      title: 'Views',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.viewCount}`,
      icon: <FaEye />,
    },
    {
      title: 'Shares',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.shareCount}`,
      icon: <BsFillShareFill />,
    },
    {
      title: 'Participation Score',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.totalParticipationScore}`,
      icon: <BsFillFileBarGraphFill />,
    },
    {
      title: 'Rewards',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.rewards}`,
      icon: <SiCashapp />,
    },
  ];

  //!----------------------------------------------------------
  // Bar Chart Data
  const data1 = {
    labels: userCamapign?.getUserCampaign?.dailyMetrics?.participationScore?.map((x: string[]) => '').slice(0, 30),
    datasets: [
      {
        label: 'Clicks',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.clickCount,
        backgroundColor: '#e4485c',
        borderColor: '#e4485c',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
      {
        label: 'Participation Score',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.participationScore,
        backgroundColor: '#1d40ad',
        borderColor: '#1d40ad',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
    ],
  };
  // Line Chat Data
  const data2 = {
    labels: userCamapign?.getUserCampaign?.dailyMetrics?.participationScore?.map((x: string[]) => ''),
    datasets: [
      {
        label: 'Clicks',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.clickCount,
        backgroundColor: '#e4485c',
        borderColor: '#e4485c',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
      {
        label: 'Views',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.viewCount,
        backgroundColor: '#f80aec',
        borderColor: '#e4485c',
        borderWidth: 1,
        hoverBackgroundColor: '#f020bc',
      },
      {
        label: 'Shares',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.shareCount,
        backgroundColor: '#f8e80a',
        borderColor: '#f4f80f',
        borderWidth: 1,
        hoverBackgroundColor: '#d2e714',
      },
      {
        label: 'Participation Score',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.participationScore,
        backgroundColor: '#1d40ad',
        borderColor: '#1d40ad',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
    ],
  };
  //!------------

  return (
    <div>
      <h1 className="text-center py-4 mb-8 text-blue-800 text-4xl font-semibold border-b-2">Campaign Analytics</h1>
      <div className="grid grid-cols-5 px-8 sm:grid-cols-1 md:grid-cols-2">
        {statCardData?.map((x, index) => (
          <StatCard key={index} compaignData={x} cardType={cardType[index]} />
        ))}
      </div>
      <div className="w-4/5 mt-12 mx-auto flex gap-4">
        {getCampaingData().length > 1 && (
          <AutoCompleteDropDown
            options={getCampaingData()}
            label="Campaign"
            getCampaignId={(id) => getCampaignId(id)}
          />
        )}
        <IconButton size="medium">
          <IoIosArrowBack />
        </IconButton>
        <IconButton size="medium">
          <IoIosArrowForward />
        </IconButton>
      </div>

      {campaignId == '-1' ? (
        <div>
          <BarChart name={userCamapign?.getUserCampaign?.name} participationAnalytics={data1} />
        </div>
      ) : (
        <div>
          <LineChart name={userCamapign?.getUserCampaign?.name} campaignAnalytics={data2} />
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
