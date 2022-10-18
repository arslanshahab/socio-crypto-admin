import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LineChart from '../../componentsv2/LineChart';
import TierCard from '../../componentsv2/TierCard';
import { ApiClient } from '../../services/apiClient';
import { showErrorAlert } from '../../store/actions/alerts';
import { DashboardStatsTypes } from '../../types';
import Campaigns from '../Campaigns';
import './dashboard.scss';

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const [analytics, setAnalytics] = useState<DashboardStatsTypes>();
  const [month, setMonth] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showRange, setShowRange] = useState<string>('');

  useEffect(() => {
    // if (!month && startDate && !endDate) return;
    setLoading(true);
    ApiClient.getDashboardStats({ campaignId: '-1', startDate, endDate, month })
      .then((res) => setAnalytics(res))
      .catch((error) => dispatch(showErrorAlert(error)))
      .finally(() => setLoading(false));
  }, [month, startDate, endDate]);

  const handleSelectField = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'showRange') return setShowRange('showRange');
    setMonth(parseInt(e.target.value));
    setStartDate('');
    setEndDate('');
    setShowRange('');
  };

  return (
    <div className="dashboardWrapper">
      <div className="dashboardCol">
        <div className="lineChartSection">
          <div className="lineChartOutline"></div>
          <div className="headingWrapper">
            <p>Engagement Report</p>
            <div>
              <div className="content">
                {showRange && (
                  <div className="datePickerWrapper">
                    <input
                      onFocus={(e) => (e.target.type = 'date')}
                      placeholder="Select start date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setMonth(0);
                      }}
                    />
                    <input
                      onFocus={(e) => (e.target.type = 'date')}
                      placeholder="Select end date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setMonth(0);
                      }}
                    />
                  </div>
                )}
                <div className="dropdownWrapper">
                  <select className="selectField" onChange={handleSelectField} value={month}>
                    <option value={0}>All</option>
                    <option value={1}>Monthly</option>
                    <option value={2}>60 Days</option>
                    <option value={3}>90 Days</option>
                    <option value="showRange">Select Range</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {analytics && <LineChart analytics={analytics.rawMetrics} />}
        </div>
        <div className="tierCardSection">{analytics && <TierCard data={analytics?.aggregatedMetrics} />}</div>
        <div className="campaignTableWrapper">
          <Campaigns />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
