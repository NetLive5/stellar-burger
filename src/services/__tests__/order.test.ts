import {
  order,
  initialState,
  createOrder,
  getUserOrders,
  orderByNumber
} from '../../services/slices/OrderSlice';

const mockData = {
  createOrder: {
    pending: {
      type: createOrder.pending.type,
      payload: null
    },
    fulfilled: {
      type: createOrder.fulfilled.type,
      payload: { order: { number: '1' } }
    },
    rejected: {
      type: createOrder.rejected.type
    }
  },
  getUserOrders: {
    pending: {
      type: getUserOrders.pending.type,
      payload: null
    },
    fulfilled: {
      type: getUserOrders.fulfilled.type,
      payload: { orders: ['order', 'order 2'] }
    },
    rejected: {
      type: getUserOrders.rejected.type
    }
  },
  orderByNumber: {
    pending: {
      type: orderByNumber.pending.type,
      payload: null
    },
    fulfilled: {
      type: orderByNumber.fulfilled.type,
      payload: { orders: ['order'] }
    },
    rejected: {
      type: orderByNumber.rejected.type
    }
  }
};

describe('Проверяем работу order', () => {
  describe('Проверка работы createOrder', () => {
    it('Проверка pending', () => {
      const res = order(initialState, mockData.createOrder.pending);
      expect(res.isLoading).toBe(true);
    });
    it('Проверка fulfilled', () => {
      const res = order(initialState, mockData.createOrder.fulfilled);
      expect(res.isLoading).toBe(false);
      expect(res.data?.number).toBe(
        mockData.createOrder.fulfilled.payload.order.number
      );
    });
    it('Проверка rejected', () => {
      const res = order(initialState, mockData.createOrder.rejected);
      expect(res.isLoading).toBe(false);
      expect(res.request).toBe(false);
    });
  });
  describe('Проверка работы getUserOrders', () => {
    it('Проверка pending', () => {
      const res = order(initialState, mockData.getUserOrders.pending);
      expect(res.isLoading).toBe(true);
    });
    it('Проверка fulfilled', () => {
      const res = order(initialState, mockData.getUserOrders.fulfilled);
      expect(res.isLoading).toBe(false);
      expect(res.request).toBe(false);
      expect(res.order).toBe(mockData.getUserOrders.fulfilled.payload);
    });
    it('Проверка rejected', () => {
      const res = order(initialState, mockData.getUserOrders.rejected);
      expect(res.isLoading).toBe(false);
    });
  });
  describe('Проверка работы orderByNumberi', () => {
    it('Проверка pending', () => {
      const res = order(initialState, mockData.orderByNumber.pending);
      expect(res.isLoading).toBe(true);
    });
    it('Проверка fulfilled', () => {
      const res = order(initialState, mockData.orderByNumber.fulfilled);
      expect(res.isLoading).toBe(false);
      expect(res.data).toBe(mockData.orderByNumber.fulfilled.payload.orders[0]);
    });
    it('Проверка rejected', () => {
      const res = order(initialState, mockData.orderByNumber.rejected);
      expect(res.isLoading).toBe(false);
    });
  });
});
