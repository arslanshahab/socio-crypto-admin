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
    $sharedMedia: String
    $tagline: String!
    $requirements: JSON!
    $suggestedPosts: [String]
    $suggestedTags: [String]
    $keywords: [String]
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
      sharedMedia: $sharedMedia
      tagline: $tagline
      requirements: $requirements
      suggestedPosts: $suggestedPosts
      suggestedTags: $suggestedTags
      keywords: $keywords
      type: $type
      rafflePrize: $rafflePrize
      cryptoId: $cryptoId
    ) {
      campaignId
      campaignImageSignedURL
      sharedMediaSignedURL
      raffleImageSignedURL
    }
  }
`;

export const NEW_CAMPAIGN_IMAGES = gql`
  mutation newCampaignImages($id: String!, $image: String, $sharedMedia: String) {
    newCampaignImages(id: $id, image: $image, sharedMedia: $sharedMedia) {
      id
      imagePath
      sharedMedia
      sharedMediaFormat
    }
  }
`;
