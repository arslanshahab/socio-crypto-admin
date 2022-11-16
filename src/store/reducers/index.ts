import { combineReducers } from 'redux';
import alerts from './alerts';
import campaign from './campaign';
import settings from './settings';
import user from './user';
import profile from './profile';
import { coiin } from './coiin';
import { channelMedia } from './campaign';

const rootReducer = combineReducers({
  alerts,
  newCampaign: campaign,
  settings,
  user,
  profile,
  coiin,
  channelMedia,
});

export default rootReducer;
export type RootStoreState = ReturnType<typeof rootReducer>;
