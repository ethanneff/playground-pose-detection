import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as ScreenOrientation from "expo-screen-orientation";

type OrientationState = {
  direction: ScreenOrientation.Orientation;
};

const initialState: OrientationState = {
  direction: ScreenOrientation.Orientation.PORTRAIT_UP,
};

export const orientationSlice = createSlice({
  name: "orientation",
  initialState,
  reducers: {
    setOrientation: (
      state,
      action: PayloadAction<ScreenOrientation.Orientation>
    ) => {
      state.direction = action.payload;
    },
  },
});
