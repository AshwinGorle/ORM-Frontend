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
    status: 'idle',
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

  getTableOrders: {
    status: null,
    error: null,
    data: null,
  },

  openEditOrderDialog : false,
  selectedEditOrder : null,

  openDeleteOrderDialog : false,
  selectedDeleteOrder : null

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
      const order = action.payload.order;
      state.getAllOrders.data[`${order.status}`].unshift(order);
    },
    createOrderFailure: (state, action) => {
      state.createOrder.status = "failed";
      state.createOrder.error = action.payload;
    },

    getTableOrdersRequest : (state) => {
      state.getTableOrders.status = "pending";
    },

    getTableOrderSuccess : (state, action)=>{
      state.getTableOrders.status = "success";
      state.getTableOrders.data = action.payload;
    },
    getTableOrderFailure : (state) => {
      state.getTableOrders.status = "message";
      state.getTableOrders.message = action.payload;
    },

    clearGetTableOrderStatus : (state) => {
      state.getTableOrders.status = null;
    },
    clearGetTableOrderData : (state) => {
      state.getTableOrders.data = null;
    },
    clearGetTableOrderError : (state) => {
      state.getTableOrders.error = null;
    },

    /////////////////////////////////////////////////////////////////

   
    //////////// fro edit and delete order dialogs///////////
    setOpenEditOrder: (state, action) => {
      state.openEditOrderDialog = action.payload;
    },
    
    setSelectedEditOrder: (state, action) => {
      state.selectedEditOrder = action.payload;
    },
    
    setOpenDeleteOrder: (state, action) => {
      state.openDeleteOrderDialog = action.payload;
    },
    
    setSelectedDeleteOrder: (state, action) => {
      state.selectedDeleteOrder = action.payload;
    },
    //////////// fro edit and delete order dialogs///////////

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
      const newOrder = action.payload;
      console.log("new Order in action-------", newOrder)
      if(!state.getAllOrders.data){
        state.getAllOrders.data= {
          draft:[],  
          pending: [],
          preparing: [],
          completed: [],
        }
      }
      const existsInPending = state.getAllOrders.data.pending.some(order => order._id.toString() === newOrder._id.toString());
      if (!existsInPending) {
        state.getAllOrders.data.pending.unshift(newOrder);
        // state.getAllOrders.status = 'success';
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
      state.updateOrder.status = 'pending';
      state.updateOrder.error = null;
    },
    updateOrderSuccess: (state, action) => {
      state.updateOrder.status = 'success';
      // Get the updated order from the action payload
      const updatedOrder = action.payload.order;
      
      // Remove the order from its current status array
      state.getAllOrders.data.draft = state.getAllOrders.data.draft.filter((prevOrder)=> prevOrder._id != updatedOrder._id);
      state.getAllOrders.data.pending = state.getAllOrders.data.pending.filter((prevOrder)=> prevOrder._id != updatedOrder._id);
      state.getAllOrders.data.preparing = state.getAllOrders.data.preparing.filter((prevOrder)=> prevOrder._id != updatedOrder._id);
      state.getAllOrders.data.completed = state.getAllOrders.data.completed.filter((prevOrder)=> prevOrder._id != updatedOrder._id);
      
      // Add the updated order to its status array
      state.getAllOrders.data[`${updatedOrder.status}`].unshift(updatedOrder);
    },
    updateOrderFailure: (state, action) => {
      state.updateOrder.status = 'failed';
      state.updateOrder.error = action.payload;
    },
    clearUpdateOrderStats: (state) => {
      state.updateOrder.status = 'idle';
      state.updateOrder.error = null;
    },

    // deleteOrder
    deleteOrderRequest: (state) => {
      state.deleteOrder.status = "pending";
    },
    deleteOrderSuccess: (state, action) => {
      state.deleteOrder.status = "success";
      const deletedOrder = action.payload.order
      if(deletedOrder.status == 'draft'){
        state.getAllOrders.data.draft = state.getAllOrders.data.draft.filter((prevOrder)=> prevOrder._id.toString() != deletedOrder._id.toString());
      }
      if(deletedOrder.status == 'pending'){
        state.getAllOrders.data.pending = state.getAllOrders.data.pending.filter((prevOrder)=> prevOrder._id.toString() != deletedOrder._id.toString());
      }
      if(deletedOrder.status == 'preparing'){
        state.getAllOrders.data.preparing = state.getAllOrders.data.preparing.filter((prevOrder)=> prevOrder._id.toString() != deletedOrder._id.toString());
      }
      if(deletedOrder.status == 'completed'){
        state.getAllOrders.data.completed = state.getAllOrders.data.completed.filter((prevOrder)=> prevOrder._id.toString() != deletedOrder._id.toString());
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

    clearDeleteOrderStats: (state) => {
      state.deleteOrder.status = null;
      state.deleteOrder.error = null;
      state.deleteOrder.data = null;
    },
  },
});

export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
