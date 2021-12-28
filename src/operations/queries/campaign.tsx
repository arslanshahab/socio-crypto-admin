import { gql } from '@apollo/client';

export const LIST_CAMPAIGNS = gql`
  query listCampaigns($skip: Int, $take: Int, $scoped: Boolean, $sort: Boolean, $approved: Boolean, $open: Boolean) {
    listCampaigns(skip: $skip, take: $take, scoped: $scoped, sort: $sort, approved: $approved, open: $open) {
      results {
        id
        name
        coiinTotal
        algorithm
        requirements
        totalParticipationScore
        beginDate
        description
        status
        endDate
        company
        imagePath
        campaignType
        symbol
        socialMediaType
        campaignMedia {
          id
          channel
          isDefault
          media
          mediaFormat
        }
        campaignTemplates {
          id
          channel
          post
        }
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

export const GET_CAMPAIGN = gql`
  query getCampaign($id: String) {
    getCampaign(id: $id) {
      id
      name
      coiinTotal
      algorithm
      requirements
      totalParticipationScore
      beginDate
      description
      instructions
      target
      targetVideo
      status
      endDate
      company
      imagePath
      campaignType
      symbol
      socialMediaType
      suggestedTags
      keywords
      type
      campaignMedia {
        id
        channel
        isDefault
        media
        mediaFormat
      }
      campaignTemplates {
        id
        channel
        post
      }
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
export const GET_USER_CAMPAIGNS = gql`
  query getUserAllCampaign {
    getUserAllCampaign {
      id
      name
    }
  }
`;
//!------------------
export const DASHBOARD_METRICS = gql`
  query getDashboardMetrics($campaignId: String) {
    getDashboardMetrics(campaignId: $campaignId) {
      aggregatedCampaignMetrics {
        clickCount
        viewCount
        shareCount
        participationScore
        campaign_name
      }
      campaignMetrics {
        clickCount
        viewCount
        shareCount
        participationScore
      }
    }
  }
`;
