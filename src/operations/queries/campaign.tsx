import { gql } from '@apollo/client';

export const LIST_CAMPAIGNS = gql`
  query ListCampaignsV2($skip: Int!, $take: Int!, $state: CampaignState!, $status: CampaignStatus) {
    listCampaignsV2(skip: $skip, take: $take, state: $state, status: $status) {
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
      isGlobal
      showUrl
      endDate
      company
      imagePath
      campaignType
      symbol
      network
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
  query listAllCampaignsForOrg {
    listAllCampaignsForOrg {
      id
      name
    }
  }
`;
//!------------------
export const DASHBOARD_METRICS = gql`
  query getDashboardMetrics($campaignId: String, $skip: Int, $take: Int) {
    getDashboardMetrics(campaignId: $campaignId, skip: $skip, take: $take) {
      aggregatedCampaignMetrics {
        clickCount
        viewCount
        shareCount
        participationScore
        campaignName
        totalParticipants
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
