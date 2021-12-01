export interface PaginatedCampaignResults {
  listCampaigns: {
    results: [Campaign];
    total: number;
  };
}
//!----
export interface GetUserAllCampaigns {
  getUserAllCampaign: [UserCampaignSingle];
}
export interface UserCampaignTypes {
  clickCount: string | number | undefined;
}

export interface UserCampaignSingle {
  id: string;
  name: string;
}

//!----

export interface GetCampaignResult {
  getCampaign: Campaign;
}

export interface AddPaymentMethod {
  addPaymentMethod: {
    clientSecret: string;
  };
}

export interface ChargePaymentMethodResults {
  chargePaymentMethod: {
    clientSecret: string;
  };
}

export interface ChargePaymentMethodVars {
  amount: number;
  paymentMethodId: string;
}

export interface ListPaymentMethodsResults {
  listPaymentMethods: {
    id: string;
    last4: string;
    brand: string;
  }[];
}

export interface ListOrgs {
  listOrgs: {
    name: string;
  }[];
}

export interface ListEmployees {
  listEmployees: {
    name: string;
  }[];
}

export interface CampaignListVars {
  open?: boolean;
  skip?: number;
  take?: number;
  scoped?: boolean;
  approved: boolean;
  sort?: boolean;
}

export interface CampaignGetVars {
  id?: string;
}

export interface Wallet {
  ethereumAddress: string;
  message: string;
  claimed: boolean;
  balance: number;
}

export interface StripeWallet {
  id: string;
  last4: string;
  brand: string;
}

export interface GetWalletResponse {
  getExternalAddress: {
    ethereumAddress: string;
    message: string;
    claimed: boolean;
    balance: number;
  };
}
export interface ListWalletResponse {
  listExternalAddresses: {
    ethereumAddress: string;
    message: string;
    claimed: boolean;
    balance: number;
  }[];
}

export interface GetFundingWalletResponse {
  getFundingWallet: {
    currency: WalletCurrency[];
    transfers: Transfer[];
  };
}

export interface WalletCurrency {
  id: string;
  type: string;
  balance: number;
}

export interface ListSupportedCryptoResults {
  listSupportedCrypto: {
    type: string;
    contractAddress: string;
  }[];
}

export interface ListCurrenciesResult {
  getSupportedCurrencies: string[];
}

export interface DepositAddressResult {
  getDepositAddressForSymbol: {
    symbol: string;
    address: string;
    fromTatum: boolean;
    memo?: string;
    message?: string;
    destinationTag?: string;
  };
}

export interface Transfer {
  amount: number;
  action: string;
  currency: string;
  ethAddress: string;
  createdAt: string;
}

export interface ClaimEthereumAddress {
  claimEthereumAddress: {
    ethereumAddress: string;
    message: string;
    claimed: boolean;
    balance: number;
  };
}

export interface GetCampaignVars {
  campaignId: string;
}

export interface GetTotalCampaignMetricsResults {
  getCampaignMetrics: {
    clickCount: number;
    viewCount: number;
    submissionCount: number;
    postCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
  };
}

export interface GetTotalPlatformMetricsResults {
  getTotalPlatformMetrics: {
    clickCount: number;
    viewCount: number;
    submissionCount: number;
    postCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
    participantCount: number;
    discoveryCount: number;
    conversionCount: number;
  };
}

export interface GetCurrentTierResults {
  getCurrentCampaignTier: {
    currentTier: number;
    currentTotal: number;
  };
}

export type FilterDataType =
  | 'postCount'
  | 'participantCount'
  | 'clickCount'
  | 'viewCount'
  | 'submissionCount'
  | 'likeCount'
  | 'shareCount'
  | 'commentCount'
  | 'totalDiscoveries'
  | 'totalConversions';

export type TimeFilterOptions = 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | 'all';

export interface GetHourlyCampaignMetrics {
  getHourlyCampaignMetrics: {
    [index: string]: string | number;
    interval: string;
    postCount: number;
    participantCount: number;
    clickCount: number;
    viewCount: number;
    submissionCount: number;
    likeCount: number;
    shareCount: number;
    commentCount: number;
    totalDiscoveries: number;
    totalConversions: number;
    averagePostCost: number;
    averageDiscoveryCost: number;
    averageConversionCost: number;
  }[];
}

export interface GetHourlyCampaignMetricsVars {
  campaignId: string;
  filter: string;
  startDate: string;
  endDate: string;
}

export interface GetHourlyPlatformMetricsVars {
  filter: string;
  startDate: string;
  endDate: string;
}

export interface GetHourlyPlatformMetrics {
  getHourlyPlatformMetrics: {
    [index: string]: string | number;
    interval: string;
    postCount: number;
    participantCount: number;
    clickCount: number;
    viewCount: number;
    submissionCount: number;
    likeCount: number;
    shareCount: number;
    commentCount: number;
    totalDiscoveries: number;
    totalConversions: number;
  }[];
}

export interface NewCampaignVars {
  id?: string;
  name: string;
  coiinTotal: number;
  target: string;
  targetVideo: string;
  beginDate: string;
  endDate: string;
  description: string;
  instructions: string;
  symbol: string;
  company: string;
  algorithm: string;
  imagePath: string;
  campaignType: string;
  socialMediaType: string[];
  requirements?: CampaignRequirementSpecs;
  tagline: string;
  suggestedPosts: string[];
  suggestedTags: string[];
  keywords: string[];
  type: string;
  rafflePrize?: RafflePrizeStructure;
  campaignTemplates: CampaignTemplateResponse[];
  campaignMedia: CampaignMediaResponse[];
}

export interface RafflePrizeStructure {
  displayName: string;
  affiliateLink?: string;
  image?: string;
}

export interface ChannelMediaObject {
  id?: string;
  channel: string;
  media: FileObject;
  isDefault: boolean;
}

export interface ChannelMediaStructure {
  [key: string]: ChannelMediaObject[];
  Twitter: ChannelMediaObject[];
  Facebook: ChannelMediaObject[];
  Tiktok: ChannelMediaObject[];
  Instagram: ChannelMediaObject[];
}

export interface ChannelTemplateObject {
  id?: string;
  channel: string;
  post: string;
}
export interface ChannelTemplateStructure {
  [key: string]: ChannelTemplateObject[];
  Twitter: ChannelTemplateObject[];
  Facebook: ChannelTemplateObject[];
  Tiktok: ChannelTemplateObject[];
  Instagram: ChannelTemplateObject[];
}

export interface CampaignConfig {
  [key: string]: string | string[] | boolean | number | FileObject | ChannelMediaStructure | ChannelTemplateStructure;
  numOfSuggestedPosts: string;
  numOfTiers: string;
  initialTotal: string;
  type: string;
  budget: string;
  agreementChecked: boolean;
  cryptoSymbol: string;
  rafflePrizeName: string;
  rafflePrizeAffiliateLink: string;
  raffleImage: FileObject;
  coiinBudget: string;
  budgetType: string;
  campaignType: string;
  socialMediaType: string[];
  success: boolean;
  channelMedia: ChannelMediaStructure;
  channelTemplates: ChannelTemplateStructure;
}

export interface CampaignMediaResponse {
  id?: string;
  channel: string;
  media: string;
  mediaFormat: string;
  isDefault: boolean;
}

export interface CampaignTemplateResponse {
  id?: string;
  channel: string;
  post: string;
}

export interface Campaign {
  id: string;
  name: string;
  beginDate: string;
  endDate: string;
  coiinTotal: string;
  crypto: CryptoCurrency;
  type: string;
  totalParticipationScore: string;
  status: string;
  symbol: string;
  target: string;
  description: string;
  instructions: string;
  keywords: string[];
  algorithm: AlgorithmSpecs;
  company: string;
  audited: boolean;
  targetVideo: string;
  imagePath: string;
  campaignType: string;
  socialMediaType: string[];
  requirements: CampaignRequirementSpecs;
  tagline: string;
  suggestedPosts: string[];
  suggestedTags: string[];
  campaignMedia: CampaignMediaResponse[];
  campaignTemplates: CampaignTemplateResponse[];
}

export interface CampaignCreationResponse {
  campaignId: string;
  campaignImageSignedURL: string;
  raffleImageSignedURL: string;
  mediaUrls: CampaignMediaSignedUrl[];
}

interface CampaignMediaSignedUrl {
  name: string;
  channel: string;
  signedUrl: string;
}

export interface CryptoCurrency {
  type: string;
  contractAddress: string;
}

export interface ListPendingCampaignsAdminResults {
  listPendingCampaigns: {
    results: {
      id: string;
      name: string;
      beginDate: string;
      endDate: string;
      coiinTotal: string;
      totalParticipationScore: string;
      target: string;
      description: string;
      algorithm: AlgorithmSpecs;
      company: string;
      audited: boolean;
      type: string;
      crypto: CryptoCurrency;
      targetVideo: string;
      imagePath: string;
      requirements?: CampaignRequirementSpecs;
      tagline: string;
      suggestedPosts: string[];
      suggestedTags: string[];
      org: { name: string };
    }[];
    total: number;
  };
}

export interface StoreSettings {
  appLoader: boolean;
  languageCode: string;
  loadingMessage: string;
}

export interface Alert {
  message: string;
  open: boolean;
}

export interface StoreAlerts {
  success: Alert;
  error: Alert;
}

export interface FileObject {
  filename: string;
  format: string;
  file: string;
}

export interface CampaignState {
  [key: string]:
    | string
    | string[]
    | FileObject
    | CampaignConfig
    | AlgorithmSpecs
    | CampaignRequirementSpecs
    | undefined;
  id: string;
  name: string;
  beginDate: string;
  endDate: string;
  totalParticipationScore: string;
  target: string;
  description: string;
  algorithm: AlgorithmSpecs;
  company: string;
  targetVideo: string;
  currency: string;
  campaignImage: FileObject;
  media: FileObject;
  tagline: string;
  requirements: CampaignRequirementSpecs;
  suggestedPosts: string[];
  suggestedTags: string[];
  keywords: string[];
  instructions: string;
  config: CampaignConfig;
}

export interface Participant {
  id: string;
  metrics: ParticipantMetrics;
  user: PublicUser;
  campaign: Campaign;
  link: string;
  participationScore: number;
}

export interface CampaignRequirementSpecs {
  version: string;
  location: LocationRequirementSpecs[];
  values: string[];
  interests: string[];
  ageRange: AgeRangeRequirementSpecs;
  socialFollowing: SocialFollowingSpecs;
  email: boolean;
}
export interface LocationRequirementSpecs {
  city?: string;
  state?: string;
  country?: string;
}

export interface SocialFollowingSpecs {
  twitter: TwitterSocialFollowingSpecs;
}
export interface TwitterSocialFollowingSpecs {
  minFollower: number;
}

export interface AgeRangeRequirementSpecs {
  [key: string]: boolean;
  '0-17': boolean;
  '18-25': boolean;
  '26-40': boolean;
  '41-55': boolean;
  '55+': boolean;
}

export interface ParticipantMetrics {
  viewCount: number;
  clickCount: number;
  submissionCount: number;
  participationScore: number;
}

export interface PublicUser {
  id: string;
  username: string;
  ageRange: string;
}

export interface AlgoTier {
  [key: string]: Tier;
}

export interface AlgorithmSpecs {
  [key: string]: ActionValues | Tiers;
  pointValues: ActionValues;
  tiers: AlgoTier;
}

export interface Tier {
  threshold: string;
  totalCoiins: string;
}

export interface ActionValues {
  [key: string]: string;
  clicks: string;
  views: string;
  submissions: string;
  likes: string;
  shares: string;
}

export interface ErrorObject {
  [key: string]: boolean;
}

export type APIError = GraphQLError;
