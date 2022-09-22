import React, { FC, useEffect, useState } from 'react';
import styles from './campaignAnalytics.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import Select from 'react-select';
import { StylesConfig } from 'react-select';
import BarChart from '../../componentsv2/BarChart';
import CustomCard from '../../componentsv2/CustomCard';
import { ApiClient } from '../../services/apiClient';
import { CampaignAggregationTypes, CampaignStatTypes, UserStatTypes } from '../../types';
import { showErrorAlert } from '../../store/actions/alerts';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const CampaignAnalytics: FC = () => {
  const dispatch = useDispatch();
  const [openTab, setOpenTab] = useState(1);
  const [campaignId, setCamapignId] = useState('-1');
  const [campaignStats, setCampaignStats] = useState<CampaignAggregationTypes>();
  const [userStats, setUserStats] = useState<UserStatTypes>();
  const [campaigns, setCampaigns] = useState<{ value: string; label: string }[]>([]);
  const [graphData, setGraphData] = useState<CampaignStatTypes[]>();
  const [graphLoading, setGraphLoading] = useState<boolean>(false);

  useEffect(() => {
    setGraphLoading(true);
    ApiClient.getDashboardStats(campaignId)
      .then((res) => {
        setCampaignStats(res.aggregatedMetrics);
        setGraphData(res.rawMetrics);
      })
      .catch((err) => dispatch(showErrorAlert((err as Error).message)))
      .finally(() => setGraphLoading(false));
  }, [campaignId]);

  useEffect(() => {
    ApiClient.getUserStats()
      .then((res) => setUserStats(res))
      .catch((err) => dispatch(showErrorAlert((err as Error).message)))
      .finally(() => console.log('finally..'));
  }, []);

  useEffect(() => {
    ApiClient.getLiteCampaigns()
      .then((res) => {
        const result = res.map((x) => ({
          value: x.id,
          label: x.name,
        }));
        result.unshift({ value: '-1', label: 'All' });
        setCampaigns(result);
      })
      .catch((err) => dispatch(showErrorAlert((err as Error).message)))
      .finally(() => console.log('finally..'));
  }, []);

  const hanleSelectField = (e: any) => {
    setCamapignId(e.value);
  };

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
              Past Campaigns
            </a>
          </li>
        </ul>
        <div className={styles.selectField}>
          <Select
            onChange={(e) => hanleSelectField(e)}
            defaultValue={'All'}
            options={campaigns}
            styles={customStyles}
          />
        </div>
      </div>
      {graphLoading ? (
        <div className="flex justify-center p-4">
          <CircularProgress />
        </div>
      ) : (
        <>
          {graphData?.length ? (
            <>
              <div className={styles.chartSection}>
                <BarChart data={graphData} />
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
            </>
          ) : (
            ''
          )}
        </>
      )}

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
