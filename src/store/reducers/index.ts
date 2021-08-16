import { combineReducers } from 'redux';
import alerts from './alerts';
import campaign from './campaign';
import settings from './settings';

const rootReducer = combineReducers({
  alerts,
  newCampaign: campaign,
  settings,
});

export default rootReducer;
export type RootStoreState = ReturnType<typeof rootReducer>;
