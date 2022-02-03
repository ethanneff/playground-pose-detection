import { Camera } from "expo-camera";
import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import { poseSlice, useAppDispatch, useAppSelector } from "../../redux";
import { Constants } from "./constants";

export const CameraSwitcher = () => {
  const dispatch = useAppDispatch();
  const cameraType = useAppSelector((state) => state.pose.cameraType);

  const handleSwitchCameraType = useCallback(() => {
    const front = cameraType === Camera.Constants.Type.front;
    const type = front
      ? Camera.Constants.Type.back
      : Camera.Constants.Type.front;
    dispatch(poseSlice.actions.updateCameraType(type));
  }, [cameraType, dispatch]);

  const direction =
    cameraType === Camera.Constants.Type.front ? "back" : "front";
  const message = `Switch to ${direction} camera`;

  return (
    <TouchableOpacity
      onPress={handleSwitchCameraType}
      style={{
        backgroundColor: Constants.buttonColor,
        padding: 8,
      }}
    >
      <Text>{message}</Text>
    </TouchableOpacity>
  );
};
