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
  tiers: { '1': { threshold: '0', totalCoiins: '' } },
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
  image: '',
  tagline: '',
  suggestedPosts: [],
  suggestedTags: [],
  config: {
    type: 'coiin',
    numOfSuggestedPosts: 2,
    numOfTiers: 3,
    initialTotal: '',
    budget: '',
    budgetType: '',
    campaignType: '',
    agreementChecked: false,
  },
};

interface CampaignUpdate {
  cat: string;
  key: string;
  val: any;
  tier?: string;
  index?: number;
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
          if (!state.requirements) state.requirements = { version: '1.0.0' };
          if (
            key == 'state' ||
            key == 'country' ||
            key == 'city' ||
            key == 'values' ||
            key == 'interests' ||
            key == 'ageRange' ||
            key == 'socialFollowing'
          ) {
            if (!state['requirements']) {
              const requirement: CampaignRequirementSpecs = { version: '1.0.0' };
              state['requirements'] = requirement;
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
          state['image'] = value;
          break;
        case 'algoTiers':
          if (tier) {
            const tierUpdate = { [key]: value };
            state['algorithm']['tiers'][tier] = {
              ...state['algorithm']['tiers'][tier],
              ...tierUpdate,
            };
          }
          break;
      }
    },
  },
});

export const { updateCampaignState } = campaignSlice.actions;

export default campaignSlice.reducer;
