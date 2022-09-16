import { combineReducers } from 'redux';
import alerts from './alerts';
import campaign from './campaign';
import settings from './settings';
import user from './user';
import profile from './profile';

const rootReducer = combineReducers({
  alerts,
  newCampaign: campaign,
  settings,
  user,
  profile,
});

export default rootReducer;
export type RootStoreState = ReturnType<typeof rootReducer>;
