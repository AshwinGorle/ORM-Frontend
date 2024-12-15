import { createSlice } from '@reduxjs/toolkit';

const defaultOrdersState = {
  orders: {
    status: null,
    error: null,
    data: {
      new: [],
      inProgress: [],
      completed: []
    }
  }
};

const initialState = defaultOrdersState;

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Fetch Orders
    fetchOrdersRequest: (state) => {
      state.orders.status = "pending";
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders.status = "success";
      state.orders.data = action.payload;
    },
    fetchOrdersFailure: (state, action) => {
      state.orders.status = "failed";
      state.orders.error = action.payload;
    },

    setNewOrder: (state, action) => {
      if (!state.orders.data.new) {
        state.orders.data.new = [];
      }
      const exists = state.orders.data.new.some(order => order.orderId === action.payload.orderId);
      if (!exists) {
        state.orders.data.new.unshift(action.payload);
        state.orders.status = 'success';
      }
    },
    moveOrderToInProgress: (state, action) => {
      const orderId = action.payload;
      const orderIndex = state.orders.data.new.findIndex(order => order.orderId === orderId);
      
      if (orderIndex !== -1) {
        const order = state.orders.data.new[orderIndex];
        state.orders.data.new.splice(orderIndex, 1);
        state.orders.data.inProgress.push({ ...order, status: 'inProgress' });
      }
    },
    moveOrderToCompleted: (state, action) => {
      const orderId = action.payload;
      const orderIndex = state.orders.data.inProgress.findIndex(order => order.orderId === orderId);
      
      if (orderIndex !== -1) {
        const order = state.orders.data.inProgress[orderIndex];
        state.orders.data.inProgress.splice(orderIndex, 1);
        state.orders.data.completed.push({ ...order, status: 'completed' });
      }
    },
    syncOrders: (state, action) => {
      state.orders.data = action.payload;
      state.orders.status = 'success';
    },
    clearOrders: (state) => {
      state.orders.data = defaultOrdersState.orders.data;
      state.orders.status = null;
      state.orders.error = null;
    },
    setOrderError: (state, action) => {
      state.orders.error = action.payload;
      state.orders.status = 'failed';
    }
  },
});

export const { 
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  setNewOrder,
  moveOrderToInProgress, 
  moveOrderToCompleted, 
  syncOrders,
  clearOrders,
  setOrderError 
} = orderSlice.actions;

export const selectOrders = (state) => {
//   console.log('Current orders state:', state?.order?.orders);
  return state?.order?.orders?.data || defaultOrdersState.orders.data;
};

export default orderSlice.reducer;
