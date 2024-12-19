// import { createSlice } from '@reduxjs/toolkit';

// const defaultOrdersState = {
//   orders: {
//     status: null,
//     error: null,
//     data: {
//       new: [],
//       inProgress: [],
//       completed: []
//     }
//   }
// };

// const initialState = defaultOrdersState;

// const orderSlice = createSlice({
//   name: 'orders',
//   initialState,
//   reducers: {
//     // Fetch Orders
//     fetchOrdersRequest: (state) => {
//       state.orders.status = "pending";
//     },
//     fetchOrdersSuccess: (state, action) => {
//       state.orders.status = "success";
//       state.orders.data = action.payload;
//     },
//     fetchOrdersFailure: (state, action) => {
//       state.orders.status = "failed";
//       state.orders.error = action.payload;
//     },

//     setNewOrder: (state, action) => {
//       if (!state.orders.data.new) {
//         state.orders.data.new = [];
//       }
//       const exists = state.orders.data.new.some(order => order.orderId === action.payload.orderId);
//       if (!exists) {
//         state.orders.data.new.unshift(action.payload);
//         state.orders.status = 'success';
//       }
//     },
//     moveOrderToInProgress: (state, action) => {
//       const orderId = action.payload;
//       const orderIndex = state.orders.data.new.findIndex(order => order.orderId === orderId);
      
//       if (orderIndex !== -1) {
//         const order = state.orders.data.new[orderIndex];
//         state.orders.data.new.splice(orderIndex, 1);
//         state.orders.data.inProgress.push({ ...order, status: 'inProgress' });
//       }
//     },
//     moveOrderToCompleted: (state, action) => {
//       const orderId = action.payload;
//       const orderIndex = state.orders.data.inProgress.findIndex(order => order.orderId === orderId);
      
//       if (orderIndex !== -1) {
//         const order = state.orders.data.inProgress[orderIndex];
//         state.orders.data.inProgress.splice(orderIndex, 1);
//         state.orders.data.completed.push({ ...order, status: 'completed' });
//       }
//     },
//     syncOrders: (state, action) => {
//       state.orders.data = action.payload;
//       state.orders.status = 'success';
//     },
//     clearOrders: (state) => {
//       state.orders.data = defaultOrdersState.orders.data;
//       state.orders.status = null;
//       state.orders.error = null;
//     },
//     setOrderError: (state, action) => {
//       state.orders.error = action.payload;
//       state.orders.status = 'failed';
//     }
//   },
// });

// export const { 
//   fetchOrdersRequest,
//   fetchOrdersSuccess,
//   fetchOrdersFailure,
//   setNewOrder,
//   moveOrderToInProgress, 
//   moveOrderToCompleted, 
//   syncOrders,
//   clearOrders,
//   setOrderError 
// } = orderSlice.actions;

// export const selectOrders = (state) => {
// //   console.log('Current orders state:', state?.order?.orders);
//   return state?.order?.orders?.data || defaultOrdersState.orders.data;
// };

// export default orderSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { updateOrderStatus } from "../actions/order";

const initialOrder = {
  createOrder: {
    status: null,
    error: null,
    data: null,
  },

  getAllOrders: {
    status: null,
    error: null,
    data: null,
  },
  //{
  //   draft:[],  
  //   pending: [],
  //   preparing: [],
  //   completed: [],
  // }

  updateOrder: {
    status: null,
    error: null,
    data: null,
  },

  updateOrderStatus : {
    status: null,
    error: null,
    data: null,
  
  },

  deleteOrder: {
    status: null,
    error: null,
    data: null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrder,
  reducers: {
    // createOrder
    createOrderRequest: (state) => {
      state.createOrder.status = "pending";
    },
    createOrderSuccess: (state, action) => {
      state.createOrder.status = "success";
      state.createOrder.data = action.payload;
      // state.getAllOrders.data.orders =  state.getAllOrders.data.orders.map((order)=>{
      //     if(order._id == action.payload.order._id) return action.payload.order
      //     else return order
      // })
      if (!state?.getAllOrders?.data?.orders)
        state.getAllOrders.data = { orders: [] };
      state.getAllOrders.data.orders.push(action.payload.order);
    },
    createOrderFailure: (state, action) => {
      state.createOrder.status = "failed";
      state.createOrder.error = action.payload;
    },

    /////////////////////////////////////////////////////////////////

    // getAllOrders
    getAllOrdersRequest: (state) => {
      state.getAllOrders.status = "pending";
    },
    getAllOrdersSuccess: (state, action) => {
      // orderActions.checkAndPrepareOrder();
      if(!state.getAllOrders.data){
        state.getAllOrders.data= {
          draft:[],  
          pending: [],
          preparing: [],
          completed: [],
        }
      }
      const allOrders = action.payload
      state.getAllOrders.data.draft = allOrders.filter((order)=>order.status == 'draft').reverse();
      state.getAllOrders.data.pending = allOrders.filter((order)=>order.status == 'pending').reverse();
      state.getAllOrders.data.preparing = allOrders.filter((order)=>order.status == 'preparing').reverse();
      state.getAllOrders.data.completed = allOrders.filter((order)=>order.status == 'completed').reverse();
    },
    getAllOrdersFailure: (state, action) => {
      state.getAllOrders.status = "failed";
      state.getAllOrders.error = action.payload;
    },

    checkAndPrepareOrder : (state)=>{
      if(!state.getAllOrders.data){
        state.getAllOrders.data= {
          draft:[],  
          pending: [],
          preparing: [],
          completed: [],
        }
      }
    },

    setNewOrder: (state, action) => {
      if(!state.getAllOrders.data){
        state.getAllOrders.data= {
          draft:[],  
          pending: [],
          preparing: [],
          completed: [],
        }
      }
      const exists1 = state.getAllOrders.data.pending.some(order => order._id === action.payload._id);
      const exists2 = state.getAllOrders.data.completed.some(order => order._id === action.payload._id);
      const exists3 = state.getAllOrders.data.preparing.some(order => order._id === action.payload._id);
      if (!(exists1 || exists2 || exists3)) {
        state.getAllOrders.data.pending.unshift(action.payload);
        state.getAllOrders.status = 'success';
      }
    },

    syncOrders: (state, action) => {
      state.orders.data = action.payload;
      state.orders.status = 'success';
    },

    updateOrderStatusRequest : (state) => {
      state.updateOrderStatus.status = "pending"
    },
    
    updateOrderStatusSuccess : (state, action) => {
      state.updateOrderStatus.status = "success"
      const order = action.payload.order;
      state.getAllOrders.data.draft = state.getAllOrders.data.draft.filter((prevOrder)=> prevOrder._id != order._id);
      state.getAllOrders.data.pending = state.getAllOrders.data.pending.filter((prevOrder)=> prevOrder._id != order._id);
      state.getAllOrders.data.preparing = state.getAllOrders.data.preparing.filter((prevOrder)=> prevOrder._id != order._id);
      state.getAllOrders.data.completed = state.getAllOrders.data.completed.filter((prevOrder)=> prevOrder._id != order._id);
      state.getAllOrders.data[`${order.status}`].unshift(order);
    },

    updateOrderStatusFailure : (state, action)=>{
      state.updateOrder.status = "failed";
      state.updateOrder.error = action.payload;
    },

    clearUpdateOrderStatusStats : (state)=>{
      state.updateOrderStatus.status = null;
      state.updateOrderStatus.error = null;
      state.updateOrderStatus.data = null;
    },

    /////////////////////////////////////////////

    // updateOrder
    updateOrderRequest: (state) => {
      state.updateOrder.status = "pending";
    },
    updateOrderSuccess: (state, action) => {
      state.updateOrder.status = "success";
      state.updateOrder.data = action.payload;
      state.getAllOrders.data.orders = state.getAllOrders.data.orders.map(
        (order) => {
          if (order._id === action.payload.order._id) {
            return action.payload.order;
          } else {
            return order;
          }
        }
      );
    },
    updateOrderFailure: (state, action) => {
      state.updateOrder.status = "failed";
      state.updateOrder.error = action.payload;
    },

    // deleteOrder
    deleteOrderRequest: (state) => {
      state.deleteOrder.status = "pending";
    },
    deleteOrderSuccess: (state, action) => {
      state.deleteOrder.status = "success";
      if (state.getAllOrders.data && state.getAllOrders.data.orders) {
        state.getAllOrders.data.orders = state.getAllOrders.data.orders.filter(
          (order) => order._id !== action.payload.order
        );
      }
    },
    deleteOrderFailure: (state, action) => {
      state.deleteOrder.status = "failed";
      state.deleteOrder.error = action.payload;
    },

    // Manual state cleaners
    clearGetAllOrdersStatus: (state) => {
      state.getAllOrders.status = null;
    },
    clearGetAllOrdersError: (state) => {
      state.getAllOrders.error = null;
    },
    clearGetAllOrdersData: (state) => {
      state.getAllOrders.data = {
        draft:[],  
        pending: [],
        preparing: [],
        completed: [],
      };
    },

    clearCreateOrderStats: (state) => {
      state.createOrder.status = null;
      state.createOrder.error = null;
      state.createOrder.data = null;
    },

    clearUpdateOrderStats: (state) => {
      state.updateOrder.status = null;
      state.updateOrder.error = null;
      state.updateOrder.data = null;
    },

    clearDeleteOrderStats: (state) => {
      state.deleteOrder.status = null;
      state.deleteOrder.error = null;
      state.deleteOrder.data = null;
    },
  },
});

export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
