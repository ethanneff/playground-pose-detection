import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { orientationSlice, poseSlice } from "./slices";

const reducers = combineReducers({
  pose: poseSlice.reducer,
  orientation: orientationSlice.reducer,
});

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
