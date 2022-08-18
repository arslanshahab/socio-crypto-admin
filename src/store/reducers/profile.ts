import initialState from '../initialState';

import { createReducer } from '@reduxjs/toolkit';
import { GET_PROFILE } from '../actions/profile';

const profile = createReducer(initialState.profile, {
  [GET_PROFILE]: (state, action) => {
    state.name = action.payload.name;
    state.company = action.payload.company;
    state.email = action.payload.email;
    state.enabled = action.payload.enabled;
    state.imagePath = action.payload.imagePath;
    state.orgId = action.payload.orgId;
  },
});

export default profile;
