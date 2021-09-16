import { Alert, AlgorithmSpecs, CampaignState, StoreAlerts, StoreSettings } from '../types.d';

const initialAlgorithmState: AlgorithmSpecs = {
  pointValues: {
    clicks: '1',
    views: '2',
    submissions: '6',
    likes: '3',
    shares: '9',
  },
  tiers: {},
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
  campaignImage: { filename: '', file: '', format: '' },
  media: { filename: '', file: '', format: '' },
  tagline: '',
  suggestedPosts: [],
  suggestedTags: [],
  keywords: [],
  requirements: {
    version: '',
    location: [],
    values: [],
    ageRange: {
      '0-17': false,
      '18-25': false,
      '26-40': false,
      '41-55': false,
      '55+': false,
    },
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
    numOfSuggestedPosts: '2',
    cryptoSymbol: '',
    numOfTiers: '3',
    initialTotal: '',
    coiinBudget: '0',
    budget: '',
    budgetType: '',
    campaignType: '',
    socialMediaType: 'omni-channels',
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
