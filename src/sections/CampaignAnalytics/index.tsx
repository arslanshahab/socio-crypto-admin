import React, { FC, useEffect, useState } from 'react';
import styles from './campaignAnalytics.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import Select from 'react-select';
import { StylesConfig } from 'react-select';
import BarChart from '../../componentsv2/BarChart';
import CustomCard from '../../componentsv2/CustomCard';
import { ApiClient } from '../../services/apiClient';
import { CampaignAggregationTypes, UserStatTypes } from '../../types';

const CampaignAnalytics: FC = () => {
  const [openTab, setOpenTab] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [campaignId, setCamapignId] = useState('-1');
  const [campaignStats, setCampaignStats] = useState<CampaignAggregationTypes>();
  const [userStats, setUserStats] = useState<UserStatTypes>();
  const [campaigns, setCampaigns] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    ApiClient.getDashboardStats(campaignId)
      .then((res) => {
        setCampaignStats(res.aggregatedMetrics);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log('loading...*'));
  }, []);
  useEffect(() => {
    ApiClient.getUserStats()
      .then((res) => setUserStats(res))
      .catch((err) => console.log(err))
      .finally(() => console.log('finally..'));
  }, []);
  useEffect(() => {
    ApiClient.getLiteCampaigns()
      .then((res) => {
        const result = res.map((x) => ({
          value: x.id,
          label: x.name,
        }));
        setCampaigns(result);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log('finally..'));
  }, []);

  const customStyles: StylesConfig = {
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      height: 40,
      borderRadius: 24,
      boxShadow: 'none',
      border: state.isFocused ? '1px solid #1E40AF' : '1px solid #1E40AF',
      '&:hover': {
        border: '1px solid #1E40AF',
      },
      '&:focus': {
        outline: 'none',
        boxShadow: 'none',
      },
    }),
  };

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
  const dashboardStats = { ...campaignStats, ...userStats };

  return (
    <div>
      <h1 className={`${headingStyles.mainHeading} flex justify-center py-4`}>Campaign Analytics</h1>
      <div className={styles.selectFieldSection}>
        <ul className="mb-4 shadow-md rounded-full inline-flex h-9 bg-orangeYellow" role="tablist">
          <li className="inline-block h-full">
            <a
              className={`uppercase rounded-full block text-black h-full py-2 px-6 text-sm ${
                openTab === 1 ? 'bg-cyberYellow' : 'bg-orangeYellow'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#current campaign"
              role="tablist"
            >
              Current Campaigns
            </a>
          </li>
          <li className="inline-block h-full">
            <a
              className={`uppercase rounded-full block text-black h-full py-2 px-6 text-sm ${
                openTab === 2 ? 'bg-cyberYellow' : 'bg-orangeYellow'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Post Campaigns
            </a>
          </li>
        </ul>
        <div className={styles.selectField}>
          <Select defaultValue={selectedOption} options={campaigns} styles={customStyles} />
        </div>
      </div>
      <div className={styles.chartSection}>
        <BarChart />
      </div>
      <div className={styles.boxSection}>
        <div className={styles.participationBox}>
          <span />
          <p>Participation Score</p>
        </div>
        <div className={styles.clicksBox}>
          <span />
          <p>Clicks</p>
        </div>
      </div>
      <div className={styles.lineBar} />
      <div className={styles.cardSection}>
        <div className={styles.cards}>
          {countsKey?.map((x: string, index: number) => (
            <CustomCard key={index} title={x} count={dashboardStats?.[x]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;
