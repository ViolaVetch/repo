import { createSlice } from "@reduxjs/toolkit";

export const confirmationSlice = createSlice({
  name: "confirmation",
  initialState: {
    title: null,
    message: null,
    action: () => {},
    type: "error",
    isShowing: false,
  },
  reducers: {
    showConfirmation: (state: any, action: any) => {
      const data = action.payload;

      state.title = data.title;
      state.message = data.message;
      state.action = data.action;
      state.isShowing = true;
    },
    hideConfirmation: (state: any) => {
      state.title = null;
      state.message = null;
      state.action = null;
      state.isShowing = false;
    },
  },
});

export const { showConfirmation, hideConfirmation } = confirmationSlice.actions;
export default confirmationSlice.reducer;
