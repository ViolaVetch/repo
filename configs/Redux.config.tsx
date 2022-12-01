import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import cartSlice from "redux/cartSlice";
import confirmationSlice from "redux/confirmationSlice";
import notificationSlice from "redux/notificationSlice";
import SiteConfig from "./Site.config";

const combinedReducer = combineReducers({
  cart: cartSlice,
  confirmation: confirmationSlice,
  notification: notificationSlice,
});

export type RootState = ReturnType<typeof combinedReducer>;

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartSlice,
      confirmation: confirmationSlice,
      notification: notificationSlice,
    },
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

export const Reduxium = createWrapper(makeStore, { debug: SiteConfig.DEBUG });
