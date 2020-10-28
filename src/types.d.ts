export interface PaginatedCampaignResults {
  listCampaigns: {
    results: [Campaign];
    total: number;
  };
}

export interface CampaignListVars {
  open?: boolean;
  skip?: number;
  take?: number;
  scoped?: boolean;
  sort?: boolean;
}

export interface Wallet {
  ethereumAddress: string;
  message: string;
  claimed: boolean;
  balance: number;
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
  name: string;
  coiinTotal: number;
  target: string;
  targetVideo: string;
  beginDate: string;
  endDate: string;
  description: string;
  company: string;
  algorithm: string;
  image: string;
  tagline: string;
  suggestedPosts: string[];
  suggestedTags: string[];
}

export interface CampaignConfig {
  [key: string]: string | number;
  numOfSuggestedPosts: number;
  numOfTiers: number;
  initialTotal: string;
}

export interface Campaign {
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
  targetVideo: string;
  imagePath: string;
  tagline: string;
  suggestedPosts: string[];
  suggestedTags: string[];
}

export interface CampaignState {
  [key: string]: string | string[] | AlgorithmSpecs | CampaignConfig;
  name: string;
  beginDate: string;
  endDate: string;
  totalParticipationScore: string;
  target: string;
  description: string;
  algorithm: AlgorithmSpecs;
  company: string;
  targetVideo: string;
  image: string;
  tagline: string;
  suggestedPosts: string[];
  suggestedTags: string[];
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

export interface AlgorithmSpecs {
  [key: string]: ActionValues | Tiers;
  pointValues: ActionValues;
  tiers: Tiers;
}

export interface Tiers {
  [index: string]: { threshold: string; totalCoiins: string };
}

export interface ActionValues {
  [key: string]: string;
  clicks: string;
  views: string;
  submissions: string;
  likes: string;
  shares: string;
}
