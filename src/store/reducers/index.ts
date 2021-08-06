import { combineReducers } from 'redux';
import alerts from './alerts';
import campaign from './campaign';

const rootReducer = combineReducers({
  alerts,
  newCampaign: campaign,
});

export default rootReducer;
export type RootStoreState = ReturnType<typeof rootReducer>;
