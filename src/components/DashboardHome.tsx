import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import LineChart from './Charts/LineChart';
import AutoCompleteDropDown from './AutoCompleteDropDown';
import { AggregatedMetricTypes, DashboardStats } from './../types';
import BarChart from './BarChart';
import { chartColors } from './../helpers/utils';
import axios from 'axios';
import { apiURI } from '../clients/raiinmaker-api';
import ProgressBar from './ProgressBar/ProgressBar';
import useEffectSkipFirst from '../hooks/useEffectSkipFirst';

export const DashboardHome: React.FC = () => {
  //! Use State Hook
  const [campaignId, setCamapignId] = useState('-1');
  const [campaignStats, setCampaignStats] = useState<DashboardStats[]>([]);
  const [campiagnAggregation, setCampaignAggregation] = useState<AggregatedMetricTypes | any>();
  const [userStats, setUserStats] = useState([]);
  const [campaigns, setCampaigns] = useState();
  const [loading, setLoading] = useState(false);

  // Fetch Users Dashboard Stats
  const fetchUsersStats = async () => {
    const userResponse = await axios.get(`${apiURI}/v1/user/user-stats`, { withCredentials: true });
    setUserStats(userResponse.data.data);
  };

  // Fetch All Campaigns
  const fetchCampaigns = async () => {
    const campaignsResponse = await axios.get(`${apiURI}/v1/campaign/campaigns-lite`, {
      withCredentials: true,
    });
    setCampaigns(campaignsResponse.data.data);
  };

  // Fetch Campaign Dashboard Stats
  const fetchDashboardStats = async () => {
    setLoading(true);
    const campaignResponse = await axios.get(`${apiURI}/v1/campaign/dashboard-metrics/${campaignId}`, {
      withCredentials: true,
    });
    const campaignStats = campaignResponse.data.data;
    setCampaignStats(campaignStats.calculateCampaignMetrics);
    setCampaignAggregation(campaignStats.aggregaredMetrics);
    setLoading(false);
  };

  // Call fetchData() only once
  useEffect(() => {
    const response = async () => {
      setLoading(true);
      await fetchUsersStats();
      await fetchDashboardStats();
      await fetchCampaigns();
      setLoading(false);
    };
    response();
  }, []);

  // UseEffect Skip 1st
  useEffectSkipFirst(fetchDashboardStats, [campaignId]);

  const allCampaignsList = [{ name: 'All', id: '-1' }, ...(campaigns || [])];
  const statCardsRecord = { ...userStats, ...campiagnAggregation };

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
    <div>
      {loading && <ProgressBar />}
      {loading && <div className="w-full h-full fixed bg-gray-300 opacity-50 z-10 "></div>}
      <h1 className="text-center py-4 mb-8 text-blue-800 text-4xl font-semibold border-b-2">Campaign Analytics</h1>
      <div className="grid grid-cols-5 gap-4 px-4">
        {countsKey?.map((x) => (
          <StatCard key={x} count={statCardsRecord?.[x]} type={x} />
        ))}
      </div>

      <div className="w-4/5 mt-12 mx-auto flex gap-4">
        <AutoCompleteDropDown
          options={allCampaignsList}
          label="Campaign"
          getCampaignId={(id) => getCampaignId(id || '')}
        />
      </div>

      <div className="pb-4">
        {campaignId === '-1' ? (
          <div>
            <BarChart name="All" participationAnalytics={barChartData} />
          </div>
        ) : (
          <div>
            <LineChart
              name={campiagnAggregation.campaignName}
              campaignAnalytics={lineChartData}
              options={lineChartOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
};
