import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClient } from '../services/apiClient';

export const fetchCoiinValue = createAsyncThunk('coiin/fetchCoiinValue', async () => {
  try {
    const response = await ApiClient.getCoiinValue();
    return response.coiin;
  } catch (error) {
    console.log('Error:(', error);
  }
});
