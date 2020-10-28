import { gql } from '@apollo/client';

export const GET_HOURLY_PLATFORM_METRICS = gql`
  query getHourlyPlatformMetrics($filter: String!, $startDate: String!, $endDate: String!) {
    getHourlyPlatformMetrics(filter: $filter, startDate: $startDate, endDate: $endDate) {
      campaignId
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
    }
  }
`;

export const GET_TOTAL_PLATFORM_METRICS = gql`
  query getTotalPlatformMetrics {
    getTotalPlatformMetrics {
      clickCount
      viewCount
      submissionCount
      postCount
      likeCount
      commentCount
      shareCount
      participantCount
      discoveryCount
      conversionCount
    }
  }
`;
