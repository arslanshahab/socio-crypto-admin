import React, { useEffect, useState } from 'react';
import { Campaign } from '../../types';
import { formatFloat } from '../../helpers/formatter';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';

interface Props {
  campaign: Campaign;
}
type CurrentTierTypes = {
  campaignType: string;
  currentTier: number;
  currentTotal: number;
  tokenValueCoiin: number | null;
  tokenValueUsd: number | null;
};

type MetricsTypes = {
  clickCount: number;
  commentCount: number;
  likeCount: number;
  participantCount: number;
  postCount: number;
  shareCount: number;
  submissionCount: number;
  viewCount: number;
};

const RenderRow: React.FC<Props> = ({ campaign }) => {
  const history = useHistory();
  const [statusData, setStatusData] = useState<CurrentTierTypes>();
  const [metricsData, setMetricsData] = useState<MetricsTypes>();
  const [statusLoading, setStatusLoading] = useState(true);
  const [metricsLoading, setMetricsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignStatus = async () => {
      setStatusLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/campaign/current-campaign-tier?campaignId=${campaign.id}`, {
        withCredentials: true,
      });
      setStatusData(data.data);
      setStatusLoading(false);
    };

    fetchCampaignStatus();
  }, []);

  useEffect(() => {
    const fetchCampaignMetrics = async () => {
      setMetricsLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/campaign/campaign-metrics?campaignId=${campaign.id}`, {
        withCredentials: true,
      });
      setMetricsData(data.data);
      setMetricsLoading(false);
    };
    fetchCampaignMetrics();
  }, []);

  const getStatus = () => {
    const endDate = new Date(campaign.endDate);
    const now = new Date();
    return now < endDate ? 'Open' : 'Closed';
  };

  const numberOfTiers = Object.values(campaign.algorithm.tiers).filter(
    (item) => item.threshold && item.totalCoiins,
  ).length;

  const hasTier = campaign.algorithm.tiers[numberOfTiers];
  const budget = hasTier ? campaign.algorithm.tiers[numberOfTiers].totalCoiins : '0';

  const redirect = (id: string, e: React.ChangeEvent<any>) => {
    history.push(`/dashboard/editCampaign/${id}`);
    e.stopPropagation();
  };

  return (
    <tr
      className="hover:bg-gray-100 border-b-2 border-solid border-gray-100 cursor-pointer"
      onClick={() => history.push(`/dashboard/campaigns/${campaign.id}`, { campaign, isAudit: false })}
    >
      <td className="px-7 py-5 text-left capitalize">{campaign.name}</td>
      <td className="px-7 py-5 text-left">{formatFloat(budget)}</td>
      <td className="px-7 py-5 text-left">
        {statusLoading ? 'loading...' : `${statusData && statusData.currentTier}`}
      </td>

      <td className="px-7 py-5 text-left">
        {metricsLoading
          ? 'loading...'
          : metricsData
          ? metricsData.shareCount + metricsData.commentCount + metricsData.likeCount
          : 0}
      </td>
      <td className="px-7 py-5 text-left">
        {metricsLoading
          ? 'loading...'
          : metricsData
          ? metricsData.clickCount + metricsData.viewCount + metricsData.submissionCount
          : 0}
      </td>
      <td className="px-7 py-5 text-left">
        {statusLoading ? 'loading...' : `${formatFloat(statusData?.currentTotal || 0)} ${campaign.symbol}`}
      </td>
      <td className="px-7 py-5 text-left">{getStatus()}</td>
      <td className="px-7 py-5 text-left">
        <Tooltip title="Edit Campaign" placement="top">
          <span className="cursor-pointer" onClick={(e) => redirect(campaign.id, e)}>
            <EditIcon />
          </span>
        </Tooltip>
      </td>
    </tr>
  );
};

export default RenderRow;
