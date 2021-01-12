import { gql } from '@apollo/client';

export const FUND_CAMPAIGNS = gql`
  mutation fundCampaigns($campaignIds: [String]) {
    fundCampaigns(campaignIds: $campaignIds)
  }
`;
