import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import LineChart from './Charts/LineChart';
import AutoCompleteDropDown from './AutoCompleteDropDown';
// import { useQuery } from '@apollo/client';
// import { GET_USER_CAMPAIGNS, DASHBOARD_METRICS } from '../operations/queries/campaign';
import { AggregatedMetricTypes, CampaignsListType, DashboardStats } from './../types';
import BarChart from './BarChart';
import { chartColors } from './../helpers/utils';
import axios from 'axios';
import { apiURI } from '../clients/raiinmaker-api';

export const DashboardHome: React.FC = () => {
  //! Use State Hook
  const [campaignId, setCamapignId] = useState('-1');
  const [campaignStats, setCampaignStats] = useState<DashboardStats[]>([]);
  const [aggregatedMetrics, setAggregatedMetrics] = useState<AggregatedMetricTypes | any>();
  const [userStats, setUserStats] = useState([]);
  const [campaigns, setCampaigns] = useState<CampaignsListType>();

  //! ApolloClient Query Hook
  // const { data } = useQuery<GetUserCampaigns>(GET_USER_CAMPAIGNS, {
  //   variables: { scoped: true, skip: 0, take: 50, sort: true, approved: true, open: true },
  //   fetchPolicy: 'cache-and-network',
  // });

  //! Dashboard Metrics
  // const { data: dashboardMetrics } = useQuery(DASHBOARD_METRICS, {
  //   variables: { campaignId },
  //   fetchPolicy: 'cache-and-network',
  // });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const userResponse = await axios.get(`${apiURI}/v1/user/user-stats`, { withCredentials: true });
      const campaignsResponse = await axios.get(`${apiURI}/v1/campaign?skip=0&take=130&state=ALL`, {
        withCredentials: true,
      });
      setUserStats(userResponse.data.data);
      setCampaigns(campaignsResponse.data.data);
    };
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const campaignResponse = await axios.get(`${apiURI}/v1/campaign/campaign-metrics/${campaignId}`, {
        withCredentials: true,
      });
      const campaignStats = campaignResponse.data.data;
      setCampaignStats(campaignStats.calculateCampaignMetrics);
      setAggregatedMetrics({ ...userStats, ...campaignStats.aggregaredMetrics });
    };
    fetchDashboardStats();
  }, [userStats, campaignId]);

  const allCampaignsList = [{ name: 'All', id: '-1' }, ...(campaigns?.items || [])];

  const getCampaignId = (id: string) => {
    setCamapignId(id);
  };

  //! Stat Card Keys
  const countsKey = [
    'clickCount',
    'viewCount',
    'shareCount',
    'totalParticipants',
    'participationScore',
    'totalUsers',
    'lastWeekUsers',
    'distributedTotalAmount',
    'redeemedTotalAmount',
    'bannedUsers',
  ];

  //! Bar Chart Data
  const barChartData = {
    labels: campaignStats.map((x) => ''),
    datasets: [
      {
        label: 'Clicks',
        data: campaignStats?.map((x) => x.clickCount),
        backgroundColor: chartColors[0],
        borderWidth: 1,
      },
      {
        label: 'Participation Score',
        data: campaignStats?.map((x) => x.participationScore),

        backgroundColor: chartColors[1],
        borderWidth: 1,
      },
    ],
  };

  //! Line Chart Data
  const lineChartData = {
    labels: campaignStats?.map((x) => ''),
    datasets: [
      {
        label: 'Clicks',
        data: campaignStats?.map((x) => x.clickCount),
        backgroundColor: chartColors[0],
        borderColor: chartColors[0],
        borderWidth: 1,
      },
      {
        label: 'Views',
        data: campaignStats?.map((x) => x.viewCount),
        backgroundColor: chartColors[1],
        borderColor: chartColors[1],
        borderWidth: 1,
      },
      {
        label: 'Shares',
        data: campaignStats?.map((x) => x.shareCount),
        backgroundColor: chartColors[2],
        borderColor: chartColors[2],
        borderWidth: 1,
      },
      {
        label: 'Participation Score',
        data: campaignStats?.map((x) => x.participationScore),
        backgroundColor: chartColors[3],
        borderColor: chartColors[3],
        borderWidth: 1,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      x: {
        ticks: { color: chartColors[0] },
      },
      y: {
        ticks: { color: chartColors[1] },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="pb-1">
      <h1 className="text-center py-4 mb-8 text-blue-800 text-4xl font-semibold border-b-2">Campaign Analytics</h1>
      <div className="grid grid-cols-5 gap-4 px-4">
        {countsKey?.map((x) => (
          <StatCard key={x} count={aggregatedMetrics?.[x] || 0} type={x} />
        ))}
      </div>
      <div className="w-4/5 mt-12 mx-auto flex gap-4">
        <AutoCompleteDropDown
          options={allCampaignsList}
          label="Campaign"
          getCampaignId={(id) => getCampaignId(id || '')}
        />
      </div>

      {campaignId === '-1' ? (
        <div>
          <BarChart name="All" participationAnalytics={barChartData} />
        </div>
      ) : (
        <div>
          <LineChart name={''} campaignAnalytics={lineChartData} options={lineChartOptions} />
        </div>
      )}
    </div>
  );
};
