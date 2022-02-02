import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as posedetection from "@tensorflow-models/pose-detection";
import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";

type PoseState = {
  cameraType: CameraType;
  fps: number;
  poses: posedetection.Pose[];
};

const initialState: PoseState = {
  fps: 0,
  cameraType: Camera.Constants.Type.front,
  poses: [],
};

export const poseSlice = createSlice({
  name: "pose",
  initialState,
  reducers: {
    updateFps: (state, action: PayloadAction<number>) => {
      state.fps = action.payload;
    },
    updateCameraType: (state, action: PayloadAction<CameraType>) => {
      state.cameraType = action.payload;
    },
    updatePoses: (state, action: PayloadAction<posedetection.Pose[]>) => {
      state.poses = action.payload;
    },
  },
});
