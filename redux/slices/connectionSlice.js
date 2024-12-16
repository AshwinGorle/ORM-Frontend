import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  lastError: null
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setConnectionError: (state, action) => {
      state.lastError = action.payload;
      state.isConnected = false;
    },
    clearConnectionError: (state) => {
      state.lastError = null;
    }
  }
});

export const { setConnectionStatus, setConnectionError, clearConnectionError } = connectionSlice.actions;
export const selectConnectionStatus = (state) => state.connection?.isConnected ?? false;
export const selectConnectionError = (state) => state.connection?.lastError ?? null;

export default connectionSlice.reducer; 