import { feed, initialState, feedsApi } from '../../services/slices/FeedSlice';

const mockData = {
  pending: {
    type: feedsApi.pending.type,
    payload: null
  },
  rejected: {
    type: feedsApi.rejected.type
  },
  fulfilled: {
    type: feedsApi.fulfilled.type,
    payload: { orders: ['order', 'order 2'] }
  }
};

describe('Проверяем работу FeedSlice', () => {
  it('Проверяем getFeedOrders.pending', () => {
    const res = feed(initialState, mockData.pending);
    expect(res.isLoading).toBe(true);
  });
  it('Проверяем getFeedOrders.fulfilled', () => {
    const res = feed(initialState, mockData.fulfilled);
    expect(res.isLoading).toBe(false);
    expect(res.feeds).toEqual(mockData.fulfilled.payload.orders);
  });
  it('Проверяем getFeedOrders.rejected', () => {
    const res = feed(initialState, mockData.rejected);
    expect(res.isLoading).toBe(false);
  });
});
