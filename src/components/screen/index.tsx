import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

type Props = {
  children: React.ReactNode;
};

export const Screen = ({ children }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};
