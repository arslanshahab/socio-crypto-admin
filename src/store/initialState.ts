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
  id: '',
  name: '',
  beginDate: '',
  endDate: '',
  totalParticipationScore: '',
  description: '',
  algorithm: initialAlgorithmState,
  company: '',
  target: '',
  targetVideo: '',
  symbol: '',
  campaignImage: { filename: '', file: '', format: '' },
  media: { filename: '', file: '', format: '' },
  tagline: '',
  suggestedPosts: ['', ''],
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
    socialMediaType: ['Twitter'],
    agreementChecked: false,
    raffleImage: { filename: '', file: '', format: '' },
    rafflePrizeName: '',
    rafflePrizeAffiliateLink: '',
    success: false,
    channelMedia: {
      Tiktok: [{ channel: 'Tiktok', media: { filename: '', file: '', format: '' }, isDefault: true }],
      Twitter: [{ channel: 'Twitter', media: { filename: '', file: '', format: '' }, isDefault: true }],
      Instagram: [{ channel: 'Instagram', media: { filename: '', file: '', format: '' }, isDefault: true }],
      Facebook: [{ channel: 'Facebook', media: { filename: '', file: '', format: '' }, isDefault: true }],
    },
    channelTemplates: {
      Tiktok: [
        { channel: 'Tiktok', post: '' },
        { channel: 'Tiktok', post: '' },
      ],
      Twitter: [
        { channel: 'Twitter', post: '' },
        { channel: 'Twitter', post: '' },
      ],
      Instagram: [
        { channel: 'Instagram', post: '' },
        { channel: 'Instagram', post: '' },
      ],
      Facebook: [
        { channel: 'Facebook', post: '' },
        { channel: 'Facebook', post: '' },
      ],
    },
  },
  instructions: '',
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
