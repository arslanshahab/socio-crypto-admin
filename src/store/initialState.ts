import { Alert, AlgorithmSpecs, CampaignState, ProfileTypes, StoreAlerts, StoreSettings, UserData } from '../types.d';

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
  currency: '',
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
      Tiktok: [],
      Twitter: [],
      Instagram: [],
      Facebook: [],
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
    isGlobal: false,
    showUrl: false,
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

const user: UserData = {
  tempPass: false,
  id: '',
  role: '',
  company: '',
  email: '',
  isLoggedIn: false,
  resetPass: false,
  twoFactorEnabled: false,
};

const profile: ProfileTypes = {
  name: '',
  company: '',
  email: '',
  enabled: false,
  imageUrl: '',
  orgId: '',
  verifyStatus: '',
};

const coiin = {
  coiinValue: '0',
  loading: false,
  error: {},
};

const initialState = {
  alerts: alerts,
  newCampaign: campaignInitState,
  settings: settings,
  user: user,
  profile: profile,
  coiin,
};

export default initialState;
