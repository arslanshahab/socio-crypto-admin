import { gql } from '@apollo/client';

export const UPDATE_CAMPAIGN_STATUS = gql`
  mutation updateCampaignStatus($status: String!, $campaignId: String!) {
    updateCampaignStatus(status: $status, campaignId: $campaignId)
  }
`;
