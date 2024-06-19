import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type FeedState = {
  feeds: TOrder[];
  todayTotal: number;
  total: number;
  isLoading: boolean;
};

const initialState: FeedState = {
  feeds: [],
  todayTotal: 0,
  total: 0,
  isLoading: false
};

export const feedsApi = createAsyncThunk(
  'getFeedOrders/getFeedsApi',
  getFeedsApi
);

const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeeds: (state) => state.feeds,
    getTotal: (state) => state.total,
    getToday: (state) => state.todayTotal,
    getLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(feedsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(feedsApi.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(feedsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.todayTotal = action.payload.totalToday;
        state.total = action.payload.total;
      });
  }
});

export const { getFeeds, getTotal, getToday } = feedSlice.selectors;
export const feed = feedSlice.reducer;
