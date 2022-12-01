import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    title: null,
    message: null,
    success: null,
    isShowing: false
  },
  reducers: {
    showNotification: (state: any, action: any) => {
        const data = action.payload;
        state.title = data.title || '';
        state.message = data.message || '';
        state.success = data.success;
        state.isShowing = true;

    },
    hideNotification: (state: any, action: any) => {
        state.title = null;
        state.message = null;
        state.success = null;
        state.isShowing = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
