import React from "react";
import { View } from "react-native";

type Props = {
  children?: React.ReactNode;
  margin?: number;
  padding?: number;
};

export const Spacing = ({ children, padding = 0, margin = 0 }: Props) => {
  return (
    <View style={{ padding: padding * 4, margin: margin * 4 }}>{children}</View>
  );
};
