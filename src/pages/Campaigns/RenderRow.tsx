import React from 'react';
import { Campaign, GetCurrentTierResults, GetCampaignVars, GetTotalCampaignMetricsResults } from '../../types';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_TIER, GET_TOTAL_CAMPAIGN_METRICS } from '../../operations/queries/campaign';
import { formatFloat } from '../../helpers/formatter';

interface Props {
  campaign: Campaign;
}

const RenderRow: React.FC<Props> = ({ campaign }) => {
  const { loading: loadingStatus, data: statusData } = useQuery<GetCurrentTierResults, GetCampaignVars>(
    GET_CURRENT_TIER,
    {
      variables: { campaignId: campaign.id },
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

  const numberOfTiers = Object.keys(campaign.algorithm.tiers).filter(
    (key) => campaign.algorithm.tiers[key]['threshold'] !== '' && campaign.algorithm.tiers[key]['totalCoiins'] !== '',
  ).length;
  const hasTier = campaign.algorithm.tiers[numberOfTiers];
  const budget = hasTier ? campaign.algorithm.tiers[numberOfTiers].totalCoiins : '0';

  return (
    <tr className="cursor-pointer hover:bg-gray-100">
      <td className="px-7 py-5 text-left capitalize">{campaign.name}</td>
      <td className="px-7 py-5 text-left">{budget}</td>
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
        {loadingStatus ? 'loading...' : `$${formatFloat(statusData?.getCurrentCampaignTier?.currentTotal, 2)}`}
      </td>
      <td className="px-7 py-5 text-left">{getStatus()}</td>
    </tr>
  );
};

export default RenderRow;
