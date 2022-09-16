import initialState from '../initialState';

import { createReducer } from '@reduxjs/toolkit';
import { GET_PROFILE } from '../actions/profile';

const profile = createReducer(initialState.profile, {
  [GET_PROFILE]: (state, action) => {
    state.name = action.payload.name;
    state.company = action.payload.company;
    state.email = action.payload.email;
    state.enabled = action.payload.enabled;
    state.imageUrl = action.payload.imageUrl;
    state.orgId = action.payload.orgId;
    state.verifyStatus = action.payload.verifyStatus;
  },
});

export default profile;
