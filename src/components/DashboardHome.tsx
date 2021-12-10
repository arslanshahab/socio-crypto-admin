import React, { useState } from 'react';
import StatCard from './StatCard';
import LineChart from './Charts/LineChart';
import { IconButton } from '@mui/material';
import AutoCompleteDropDown from './AutoCompleteDropDown';
import { useQuery } from '@apollo/client';
import { GET_USER_CAMPAIGNS, GET_USER_CAMPAIGN_ANALYTICS } from '../operations/queries/campaign';
import { GetUserCampaigns } from './../types';
import BarChart from './BarChart';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { chartColors } from './../helpers/utils';

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
  const getCampaignId = (id: string) => {
    setCamapignId(id);
  };
  //! Stat Card Keys
  const countsKey = ['clickCount', 'viewCount', 'shareCount', 'totalParticipationScore', 'rewards'];
  //! Bar Chart Data
  const barChartData = {
    labels: userCamapign?.getUserCampaign?.dailyMetrics?.participationScore?.map((x: string[]) => '').slice(0, 30),
    datasets: [
      {
        label: 'Clicks',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.clickCount,
        backgroundColor: chartColors[0],
        borderWidth: 1,
      },
      {
        label: 'Participation Score',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.participationScore,
        backgroundColor: chartColors[1],
        borderWidth: 1,
      },
    ],
  };
  //! Line Chart Data
  const lineChartData = {
    labels: userCamapign?.getUserCampaign?.dailyMetrics?.participationScore?.map((x: string[]) => ''),
    datasets: [
      {
        label: 'Clicks',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.clickCount,
        backgroundColor: chartColors[0],
        borderColor: chartColors[0],
        borderWidth: 1,
      },
      {
        label: 'Views',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.viewCount,
        backgroundColor: chartColors[1],
        borderColor: chartColors[1],
        borderWidth: 1,
      },
      {
        label: 'Shares',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.shareCount,
        backgroundColor: chartColors[2],
        borderColor: chartColors[2],
        borderWidth: 1,
      },
      {
        label: 'Participation Score',
        data: userCamapign?.getUserCampaign?.dailyMetrics?.participationScore,
        backgroundColor: chartColors[3],
        borderColor: chartColors[3],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-center py-4 mb-8 text-blue-800 text-4xl font-semibold border-b-2">Campaign Analytics</h1>
      <div className="grid grid-cols-5 px-8 sm:grid-cols-1 md:grid-cols-2">
        {countsKey?.map((x: any) => (
          <StatCard key={x} count={userCamapign?.getUserCampaign?.dailyMetrics[x] || ''} type={x} />
        ))}
      </div>
      <div className="w-4/5 mt-12 mx-auto flex gap-4">
        {getCampaingData().length > 1 && (
          <AutoCompleteDropDown
            options={getCampaingData()}
            label="Campaign"
            getCampaignId={(id) => getCampaignId(id || '')}
          />
        )}
        <IconButton size="medium">
          <IoIosArrowBack />
        </IconButton>
        <IconButton size="medium">
          <IoIosArrowForward />
        </IconButton>
      </div>

      {campaignId === '-1' ? (
        <div>
          <BarChart name={userCamapign?.getUserCampaign?.name} participationAnalytics={barChartData} />
        </div>
      ) : (
        <div>
          <LineChart
            name={userCamapign?.getUserCampaign?.name}
            campaignAnalytics={lineChartData}
            scaleColorX={chartColors[0]}
            scaleColorY={chartColors[1]}
          />
        </div>
      )}
    </div>
  );
};
