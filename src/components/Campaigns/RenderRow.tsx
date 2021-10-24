import React from 'react';
import { Campaign, GetCurrentTierResults, GetCampaignVars, GetTotalCampaignMetricsResults } from '../../types';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_TIER, GET_TOTAL_CAMPAIGN_METRICS } from '../../operations/queries/campaign';
import { formatFloat } from '../../helpers/formatter';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface Props {
  campaign: Campaign;
}

const RenderRow: React.FC<Props> = ({ campaign }) => {
  const history = useHistory();
  const { loading: loadingStatus, data: statusData } = useQuery<GetCurrentTierResults, GetCampaignVars>(
    GET_CURRENT_TIER,
    {
      variables: { campaignId: campaign.id },
      fetchPolicy: 'network-only',
    },
  );
  const { loading: loadingMetrics, data: metricsData } = useQuery<GetTotalCampaignMetricsResults, GetCampaignVars>(
    GET_TOTAL_CAMPAIGN_METRICS,
    {
      variables: { campaignId: campaign.id },
    },
  );

  const getStatus = () => {
    const endDate = new Date(Number(campaign.endDate));
    const now = new Date();
    return now < endDate ? 'Open' : 'Closed';
  };

  const numberOfTiers = Object.values(campaign.algorithm.tiers).filter(
    (item) => item.threshold && item.totalCoiins,
  ).length;

  const hasTier = campaign.algorithm.tiers[numberOfTiers];
  const budget = hasTier ? campaign.algorithm.tiers[numberOfTiers].totalCoiins : '0';

  const redirect = (id: string) => {
    history.push(`/dashboard/editCampaign/${id}`);
  };

  return (
    <tr className="hover:bg-gray-100 border-b-2 border-solid border-gray-100">
      <td className="px-7 py-5 text-left capitalize">{campaign.name}</td>
      <td className="px-7 py-5 text-left">{formatFloat(budget)}</td>
      <td className="px-7 py-5 text-left">
        {loadingStatus ? 'loading...' : `${statusData && statusData.getCurrentCampaignTier.currentTier}`}
      </td>
      <td className="px-7 py-5 text-left">
        {loadingMetrics
          ? 'loading...'
          : metricsData
          ? metricsData.getCampaignMetrics.shareCount +
            metricsData.getCampaignMetrics.commentCount +
            metricsData.getCampaignMetrics.likeCount
          : 0}
      </td>
      <td className="px-7 py-5 text-left">
        {loadingMetrics
          ? 'loading...'
          : metricsData
          ? metricsData.getCampaignMetrics.clickCount +
            metricsData.getCampaignMetrics.viewCount +
            metricsData.getCampaignMetrics.submissionCount
          : 0}
      </td>
      <td className="px-7 py-5 text-left">
        {loadingStatus
          ? 'loading...'
          : `${formatFloat(statusData?.getCurrentCampaignTier?.currentTotal || 0)} ${campaign.currency}`}
      </td>
      <td className="px-7 py-5 text-left">{getStatus()}</td>
      <td className="px-7 py-5 text-left">
        <Tooltip title="Edit Campaign" placement="top">
          <span className="cursor-pointer" onClick={() => redirect(campaign.id)}>
            <EditIcon />
          </span>
        </Tooltip>
      </td>
    </tr>
  );
};

export default RenderRow;
