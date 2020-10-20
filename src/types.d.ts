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
