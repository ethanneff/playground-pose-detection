import React from "react";
import { SafeAreaView } from "react-native";

type Props = {
  children: React.ReactNode;
  zIndex?: number;
};

export const Hud = ({ children, zIndex = 30 }: Props) => {
  return (
    <SafeAreaView
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex,
      }}
    >
      {children}
    </SafeAreaView>
  );
};
