import { Alert, AlgorithmSpecs, CampaignState, StoreAlerts, StoreSettings } from '../types.d';

const initialAlgorithmState: AlgorithmSpecs = {
  pointValues: {
    clicks: '1',
    views: '2',
    submissions: '6',
    likes: '3',
    shares: '9',
  },
  tiers: [],
};

const campaignInitState: CampaignState = {
  name: '',
  beginDate: '',
  endDate: '',
  totalParticipationScore: '',
  description: '',
  algorithm: initialAlgorithmState,
  company: '',
  target: '',
  targetVideo: '',
  cryptoId: '',
  image: { filename: '', file: '', format: '' },
  sharedMedia: { filename: '', file: '', format: '' },
  tagline: '',
  suggestedPosts: [],
  suggestedTags: [],
  keywords: [],
  requirements: {
    version: '',
    location: [],
    values: [],
    ageRange: [],
    interests: [],
    email: false,
    socialFollowing: {
      twitter: {
        minFollower: 0,
      },
    },
  },
  config: {
    type: 'crypto',
    numOfSuggestedPosts: 2,
    cryptoSymbol: '',
    numOfTiers: 3,
    initialTotal: '',
    coiinBudget: '0',
    budget: '',
    budgetType: '',
    campaignType: '',
    agreementChecked: false,
    raffleImage: { filename: '', file: '', format: '' },
    rafflePrizeName: '',
    rafflePrizeAffiliateLink: '',
    success: false,
  },
};

const success: Alert = {
  message: '',
  open: false,
};

const errorAlert: Alert = {
  message: '',
  open: false,
};

const alerts: StoreAlerts = {
  success: success,
  error: errorAlert,
};

const settings: StoreSettings = {
  appLoader: false,
  loadingMessage: '',
  languageCode: '',
};

const initialState = {
  alerts: alerts,
  newCampaign: campaignInitState,
  settings: settings,
};

export default initialState;
