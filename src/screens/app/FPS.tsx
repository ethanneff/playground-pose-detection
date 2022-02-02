import React from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "../../redux";
import { Constants } from "./constants";

export const Fps = () => {
  const fps = useAppSelector((state) => state.pose.fps);
  return (
    <View
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        width: 80,
        alignItems: "center",
        backgroundColor: Constants.buttonColor,
        borderRadius: 2,
        padding: 8,
        zIndex: 20,
      }}
    >
      <Text>FPS: {fps}</Text>
    </View>
  );
};
