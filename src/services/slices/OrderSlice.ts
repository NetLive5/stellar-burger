import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type OrderState = {
  order: TOrder[];
  data: TOrder | null;
  request: boolean;
  isLoading: boolean;
};

const initialState: OrderState = {
  order: [],
  data: null,
  request: false,
  isLoading: false
};

export const orderByNumber = createAsyncThunk(
  'getOrderByNumberApi/getOrderByNumberApi',
  getOrderByNumberApi
);

export const orderSlise = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state) => state.order,
    getOrderData: (state) => state.data
  },
  extraReducers: (builder) => {
    builder.addCase(orderByNumber.fulfilled, (state, action) => {
      state.data = action.payload.orders[0];
    });
    builder.addCase(orderByNumber.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(orderByNumber.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const order = orderSlise.reducer;
export const { getOrder, getOrderData } = orderSlise.selectors;
