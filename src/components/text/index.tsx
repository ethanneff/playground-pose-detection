import React from "react";
import { Text as Original } from "react-native";

type Props = {
  fontSize?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  title: string;
};

export const Text = ({ title, fontSize = 4, textAlign }: Props) => {
  return (
    <Original style={{ fontSize: fontSize * 4, textAlign }}>{title}</Original>
  );
};
