import { Alert, AlgorithmSpecs, CampaignState, StoreAlerts } from '../types.d';

const initialAlgorithmState: AlgorithmSpecs = {
  pointValues: {
    clicks: '1',
    views: '2',
    submissions: '6',
    likes: '3',
    shares: '9',
  },
  tiers: { '1': { threshold: '0', totalCoiins: '' } },
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
  image: { filename: '', file: null, format: '' },
  sharedMedia: { filename: '', file: null, format: '' },
  tagline: '',
  suggestedPosts: [],
  suggestedTags: [],
  keywords: [],
  config: {
    type: 'crypto',
    numOfSuggestedPosts: 2,
    cryptoSymbol: '',
    numOfTiers: 3,
    initialTotal: '',
    budget: '',
    budgetType: '',
    campaignType: '',
    agreementChecked: false,
    raffleImage: { filename: '', file: null, format: '' },
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

const initialState = {
  alerts: alerts,
  newCampaign: campaignInitState,
};

export default initialState;
