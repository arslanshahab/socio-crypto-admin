import { combineReducers } from 'redux';
import alerts from './alerts';
import campaign from './campaign';
import settings from './settings';
import user from './user';

const rootReducer = combineReducers({
  alerts,
  newCampaign: campaign,
  settings,
  user,
});

export default rootReducer;
export type RootStoreState = ReturnType<typeof rootReducer>;
