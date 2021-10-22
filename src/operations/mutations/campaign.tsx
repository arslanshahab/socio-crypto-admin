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
    $description: String
    $instructions: String
    $coiinTotal: Float!
    $algorithm: String!
    $company: String
    $targetVideo: String
    $imagePath: String
    $tagline: String!
    $requirements: JSON!
    $suggestedPosts: [String]
    $suggestedTags: [String]
    $keywords: [String]
    $type: String
    $rafflePrize: JSON
    $currency: String
    $campaignType: String
    $socialMediaType: [String]
    $campaignMedia: JSON
    $campaignTemplates: JSON
  ) {
    newCampaign(
      name: $name
      beginDate: $beginDate
      endDate: $endDate
      target: $target
      description: $description
      instructions: $instructions
      coiinTotal: $coiinTotal
      algorithm: $algorithm
      company: $company
      targetVideo: $targetVideo
      imagePath: $imagePath
      tagline: $tagline
      requirements: $requirements
      suggestedPosts: $suggestedPosts
      suggestedTags: $suggestedTags
      keywords: $keywords
      type: $type
      rafflePrize: $rafflePrize
      currency: $currency
      campaignType: $campaignType
      socialMediaType: $socialMediaType
      campaignMedia: $campaignMedia
      campaignTemplates: $campaignTemplates
    ) {
      campaignId
      campaignImageSignedURL
      raffleImageSignedURL
      mediaUrls {
        name
        channel
        signedUrl
      }
    }
  }
`;

export const UPDATE_CAMPAIGN = gql`
  mutation updateCampaign(
    $id: String
    $name: String!
    $beginDate: String!
    $endDate: String!
    $target: String!
    $description: String
    $instructions: String
    $coiinTotal: Float!
    $algorithm: String!
    $company: String
    $targetVideo: String
    $imagePath: String
    $tagline: String!
    $requirements: JSON!
    $suggestedPosts: [String]
    $suggestedTags: [String]
    $keywords: [String]
    $type: String
    $rafflePrize: JSON
    $currency: String
    $campaignType: String
    $socialMediaType: [String]
    $campaignMedia: JSON
    $campaignTemplates: JSON
  ) {
    updateCampaign(
      id: $id
      name: $name
      beginDate: $beginDate
      endDate: $endDate
      target: $target
      description: $description
      instructions: $instructions
      coiinTotal: $coiinTotal
      algorithm: $algorithm
      company: $company
      targetVideo: $targetVideo
      imagePath: $imagePath
      tagline: $tagline
      requirements: $requirements
      suggestedPosts: $suggestedPosts
      suggestedTags: $suggestedTags
      keywords: $keywords
      type: $type
      rafflePrize: $rafflePrize
      currency: $currency
      campaignType: $campaignType
      socialMediaType: $socialMediaType
      campaignMedia: $campaignMedia
      campaignTemplates: $campaignTemplates
    ) {
      campaignId
      campaignImageSignedURL
      raffleImageSignedURL
      mediaUrls {
        name
        channel
        signedUrl
      }
    }
  }
`;
