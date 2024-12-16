// redux/slices/systemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSystemOnline: false, // Initial value for isSystemOnline
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setSystemOnline: (state, action) => {
      state.isSystemOnline = action.payload;
    },
  },
});

export const { setSystemOnline } = systemSlice.actions;

// Selector to get the value of isSystemOnline from the state
export const selectIsSystemOnline = (state) => state.system?.isSystemOnline ?? false;

export default systemSlice.reducer;
