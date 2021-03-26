import { gql } from '@apollo/client';

export const LIST_CAMPAIGNS = gql`
  query listCampaigns($skip: Int, $take: Int, $scoped: Boolean, $sort: Boolean, $approved: Boolean, $open: Boolean) {
    listCampaigns(skip: $skip, take: $take, scoped: $scoped, sort: $sort, approved: $approved, open: $open) {
      results {
        id
        name
        coiinTotal
        algorithm
        totalParticipationScore
        beginDate
        description
        status
        endDate
        company
        imagePath
        tagline
        crypto {
          type
          contractAddress
        }
        participants {
          id
          metrics {
            clickCount
          }
          user {
            id
          }
        }
      }
      total
    }
  }
`;

export const ADMIN_LIST_CAMPAIGNS = gql`
  query listPendingCampaigns($skip: Int, $take: Int) {
    listPendingCampaigns(skip: $skip, take: $take) {
      results {
        id
        name
        coiinTotal
        algorithm
        status
        totalParticipationScore
        beginDate
        description
        endDate
        company
        type
        crypto {
          type
          contractAddress
        }
        imagePath
        tagline
        org {
          name
        }
      }
      total
    }
  }
`;

export const GET_CURRENT_TIER = gql`
  query getCurrentCampaignTier($campaignId: String!) {
    getCurrentCampaignTier(campaignId: $campaignId) {
      currentTier
      currentTotal
    }
  }
`;

export const GET_TOTAL_CAMPAIGN_METRICS = gql`
  query getCampaignMetrics($campaignId: String!) {
    getCampaignMetrics(campaignId: $campaignId) {
      clickCount
      viewCount
      submissionCount
      likeCount
      shareCount
      commentCount
      postCount
    }
  }
`;

export const GET_HOURLY_CAMPAIGN_METRICS = gql`
  query getHourlyCampaignMetrics($campaignId: String!, $filter: String!, $startDate: String!, $endDate: String!) {
    getHourlyCampaignMetrics(campaignId: $campaignId, filter: $filter, startDate: $startDate, endDate: $endDate) {
      interval
      postCount
      participantCount
      clickCount
      viewCount
      submissionCount
      likeCount
      shareCount
      commentCount
      totalDiscoveries
      totalConversions
      averagePostCost
      averageDiscoveryCost
      averageConversionCost
    }
  }
`;
