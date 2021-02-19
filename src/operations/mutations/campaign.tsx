import { gql } from '@apollo/client';

export const FUND_CAMPAIGNS = gql`
  mutation fundCampaigns($campaignIds: [String]) {
    fundCampaigns(campaignIds: $campaignIds)
  }
`;

export const NEW_CAMPAIGN = gql`
  mutation newCampaign(
    $name: String!
    $beginDate: String!
    $endDate: String!
    $target: String!
    $description: String!
    $coiinTotal: Float!
    $algorithm: String!
    $company: String
    $targetVideo: String
    $image: String
    $tagline: String!
    $requirements: JSON!
    $suggestedPosts: [String]
    $suggestedTags: [String]
    $type: String
    $rafflePrize: JSON
    $cryptoId: String
  ) {
    newCampaign(
      name: $name
      beginDate: $beginDate
      endDate: $endDate
      target: $target
      description: $description
      coiinTotal: $coiinTotal
      algorithm: $algorithm
      company: $company
      targetVideo: $targetVideo
      image: $image
      tagline: $tagline
      requirements: $requirements
      suggestedPosts: $suggestedPosts
      suggestedTags: $suggestedTags
      type: $type
      rafflePrize: $rafflePrize
      cryptoId: $cryptoId
    ) {
      name
    }
  }
`;
