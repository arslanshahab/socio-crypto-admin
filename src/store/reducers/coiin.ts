import { createReducer } from '@reduxjs/toolkit';
import { fetchCoiinValue } from '../middlewares';
import initialState from '../initialState';

export const coiin = createReducer(initialState.coiin, (builder) => {
  builder.addCase(fetchCoiinValue.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(fetchCoiinValue.fulfilled, (state, action) => {
    state.coiinValue = action.payload || '0.2';
    state.loading = false;
  });
  builder.addCase(fetchCoiinValue.rejected, (state, action) => {
    state.loading = false;
    state.error = action;
  });
});
