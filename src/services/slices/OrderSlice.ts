import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
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

export const createOrder = createAsyncThunk(
  'createOrder/orderBurgerApi',
  orderBurgerApi
);

export const getUserOrders = createAsyncThunk(
  'getUserOrders/getOrdersApi',
  getOrdersApi
);

export const orderByNumber = createAsyncThunk(
  'getOrderByNumber/getOrderByNumberApi',
  getOrderByNumberApi
);

export const orderSlise = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.data = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderData: (state) => state.data,
    getRequest: (state) => state.request,
    getLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(orderByNumber.fulfilled, (state, action) => {
      state.data = action.payload.orders[0];
    });
    builder.addCase(orderByNumber.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderByNumber.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
      state.request = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.order;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.isLoading = false;
      state.request = false;
    });
  }
});

export const order = orderSlise.reducer;
export const { clearOrder } = orderSlise.actions;
export const { getOrder, getOrderData, getRequest, getLoading } =
  orderSlise.selectors;
