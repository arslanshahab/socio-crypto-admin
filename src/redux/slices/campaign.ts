import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AgeRangeRequirementSpecs,
  AlgorithmSpecs,
  CampaignRequirementSpecs,
  CampaignState,
  SocialFollowingSpecs,
  TwitterSocialFollowingSpecs,
} from '../../types';

const initialAlgorithmState: AlgorithmSpecs = {
  pointValues: {
    clicks: '',
    views: '',
    submissions: '',
    likes: '',
    shares: '',
  },
  tiers: {},
};

const initialAgeRangeState: AgeRangeRequirementSpecs = {
  '0-17': false,
  '18-25': false,
  '26-40': false,
  '41-55': false,
  '55+': false,
};
const initialTwitterSocialFollowing: TwitterSocialFollowingSpecs = {
  minFollower: 0,
};
const initialSocialFollowingState: SocialFollowingSpecs = {
  twitter: initialTwitterSocialFollowing,
};

const initialRequirementsState: CampaignRequirementSpecs = {
  version: '1.0.0',
  // city: '',
  // state: '',
  // country: '',
  // socialFollowing: initialSocialFollowingState,
  // ageRange: initialAgeRangeState,
  // values: [],
  // interests: [],
};

const initialState: CampaignState = {
  name: '',
  beginDate: '',
  endDate: '',
  totalParticipationScore: '',
  target: '',
  description: '',
  algorithm: initialAlgorithmState,
  company: '',
  targetVideo: '',
  image: '',
  tagline: '',
  suggestedPosts: [],
  suggestedTags: [],
  requirements: initialRequirementsState,
  config: {
    numOfSuggestedPosts: 1,
    numOfTiers: 1,
    initialTotal: '',
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
          console.log('in reqs case');
          console.log(key);
          console.log(value);
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
            state['requirements'][key] = value;
          }
          break;
        case 'config':
          state['config'][key] = value;
          break;
        case 'algoValues':
          state['algorithm']['pointValues'][key] = value;
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
