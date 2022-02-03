import React from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "../../redux";
import { Constants } from "./constants";

export const Fps = () => {
  const fps = useAppSelector((state) => state.pose.fps);
  return (
    <View
      style={{
        backgroundColor: Constants.buttonColor,
        padding: 8,
      }}
    >
      <Text>FPS: {fps}</Text>
    </View>
  );
};
