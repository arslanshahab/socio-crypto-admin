import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LineChart from '../../componentsv2/LineChart';
import CampaignTiers from '../../componentsv2/CampaignTiers';
import { ApiClient } from '../../services/apiClient';
import { showErrorAlert } from '../../store/actions/alerts';
import { DashboardStatsTypes, UserDemographicsTypes } from '../../types';
import Campaigns from '../Campaigns';
import './dashboard.scss';
import ReactSelect, { SingleValue } from 'react-select';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const [analytics, setAnalytics] = useState<DashboardStatsTypes>();
  const [month, setMonth] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showRange, setShowRange] = useState<string>('');
  const [demographicLoading, setDemographicLoading] = useState<boolean>(false);
  const [demographics, setDemographics] = useState<UserDemographicsTypes>();
  const [campaigns, setCampaigns] = useState<{ value: string; label: string }[]>();
  const [campaignId, setCampaignId] = useState('-1');
  const [campaignLoading, setCampaignLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    ApiClient.getDashboardStats({ campaignId, startDate, endDate, month })
      .then((res) => setAnalytics(res))
      .catch((error) => dispatch(showErrorAlert(error)))
      .finally(() => setLoading(false));
  }, [month, startDate, endDate, campaignId]);

  useEffect(() => {
    setDemographicLoading(true);
    ApiClient.getDemographics({ campaignId, startDate, endDate, month })
      .then((res) => setDemographics(res))
      .catch((error) => dispatch(showErrorAlert(error)))
      .finally(() => setDemographicLoading(false));
  }, [month, startDate, endDate, campaignId]);

  useEffect(() => {
    setCampaignLoading(true);
    ApiClient.getLiteCampaigns()
      .then((res) => {
        const result = res.map((x) => ({ value: x.id, label: x.name }));
        setCampaigns([{ value: '-1', label: 'All' }, ...result]);
      })
      .catch((error) => dispatch(showErrorAlert(error)))
      .finally(() => setCampaignLoading(false));
  }, []);

  const handleSelectField = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'showRange') return setShowRange('showRange');
    if (e.target.value !== 'Select') {
      setMonth(parseInt(e.target.value));
      setStartDate('');
      setEndDate('');
      setShowRange('');
    }
  };

  const handleSelectCampaign = (event: SingleValue<{ value: string; label: string }>) => {
    if (event) setCampaignId(event.value);
    setMonth(0);
    setStartDate('');
    setEndDate('');
    setShowRange('');
  };

  return (
    <div className="dashboardWrapper">
      <div className="dashboardCol">
        {(loading || demographicLoading || campaignLoading) && (
          <div className="loadingBar">
            <ProgressBar />
          </div>
        )}

        <div className="lineChartSection">
          <div className="searchField">
            <ReactSelect placeholder="Search Campaign" options={campaigns} onChange={handleSelectCampaign} />
          </div>
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
                    <option>Select</option>
                    <option value={1}>Monthly</option>
                    <option value={2}>60 Days</option>
                    <option value={3}>90 Days</option>
                    <option value="showRange">Select Range</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <LineChart analytics={analytics?.rawMetrics} />
        </div>
        <div className="tierCardSection">
          {demographics && analytics && (
            <CampaignTiers
              aggregates={analytics.aggregatedMetrics}
              socialPostMetrics={analytics.socialPostMetrics}
              demographics={demographics}
            />
          )}
        </div>
        <div className="campaignTableWrapper">
          <Campaigns />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
