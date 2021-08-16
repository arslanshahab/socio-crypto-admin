import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlgorithmSpecs, CampaignRequirementSpecs, CampaignState } from '../../types';

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

const initialState: CampaignState = {
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
    budget: '',
    coiinBudget: '',
    budgetType: '',
    campaignType: '',
    agreementChecked: false,
    raffleImage: { filename: '', file: '', format: '' },
    rafflePrizeName: '',
    rafflePrizeAffiliateLink: '',
    success: false,
  },
};

interface CampaignUpdate {
  cat: string;
  key: string;
  val: any;
  tier?: string;
  index?: number;
  initialTiers?: any;
}

const campaignSlice = createSlice({
  name: 'newCampaign',
  initialState,
  reducers: {
    updateCampaignState(state, action: PayloadAction<CampaignUpdate>) {
      const key = action.payload.key;
      const value = action.payload.val;
      const tier = action.payload.tier;
      const index = action.payload.index;
      const initialTiers = action.payload.initialTiers;
      switch (action.payload.cat) {
        case 'info':
          if (key === 'suggestedPosts') {
            if (index !== undefined && state[key].length - 1 >= index) {
              state[key][index] = value;
            } else {
              state[key].push(value);
            }
            break;
          } else if (key === 'suggestedTags') {
            state[key] = value.split(', ');
            break;
          }
          state[key] = value;
          break;
        case 'requirements':
          if (
            key == 'location' ||
            key == 'values' ||
            key == 'interests' ||
            key == 'ageRange' ||
            key == 'socialFollowing'
          ) {
            if (!state['requirements']) {
            }
            state['requirements'][key] = value;
          }
          break;
        case 'config':
          state['config'][key] = value;
          break;
        case 'algoValues':
          state['algorithm']['pointValues'][key] = value;
          break;
        case 'image':
          state[action.payload.key] = value;
          break;
        case 'keywords':
          state.keywords = value;
          break;
        case 'algoTiersCount':
          // if (tier) {
          //   const tierUpdate = { [key]: value };
          //   state['algorithm']['tiers'][tier] = {
          //     ...state['algorithm']['tiers'][tier],
          //     ...tierUpdate,
          //   };
          //   for (let index = 0; index < Object.keys(state['algorithm']['tiers']).length; index++) {
          //     const element = Object.keys(state['algorithm']['tiers'])[index];
          //     console.log('element');
          //     console.log(element);
          //     console.log('tier');
          //     console.log(tier);
          //     if (element > tier) delete state['algorithm']['tiers'][element];
          //   }
          // }
          break;
        case 'algoTiers':
          // if (tier) {
          //   console.log('aaaa', tier);
          //   const tierUpdate = { [key]: value };
          //   console.log('bbbb', tierUpdate);

          //   state['algorithm']['tiers'][tier] = {
          //     ...state['algorithm']['tiers'][tier],
          //     ...tierUpdate,
          //   };
          // }
          break;
        case 'initAlgoTiers':
          if (initialTiers) {
            state['algorithm']['tiers'] = {
              ...state['algorithm']['tiers'],
              ...initialTiers,
            };
          }
          break;
        case 'reset':
          return initialState;
      }
    },
  },
});

export const { updateCampaignState } = campaignSlice.actions;

export default campaignSlice.reducer;
