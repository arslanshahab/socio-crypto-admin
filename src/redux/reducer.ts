import { combineReducers } from '@reduxjs/toolkit';
import newCampaign from './slices/campaign';

const rootReducer = combineReducers({
  newCampaign,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
