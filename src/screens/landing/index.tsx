import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useCallback } from "react";
import { Button, Dimensions, View } from "react-native";
import { Screen, Spacing, Text } from "../../components";
import { UseNavigation } from "../../types";

const { width } = Dimensions.get("window");

export const Landing = () => {
  const { navigate } = useNavigation<UseNavigation>();

  const handleBegin = useCallback(() => navigate("workout"), [navigate]);

  const handleDashbaord = useCallback(() => navigate("dashboard"), [navigate]);

  return (
    <Screen>
      <Spacing padding={10} />
      <Text fontSize={10} textAlign="center" title="Pushup Pro" />
      <LottieView
        autoPlay
        loop
        source={require("./pushup.json")}
        style={{ width }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 100 }}>
        <Button onPress={handleBegin} title="Begin" />

        <Button onPress={handleDashbaord} title="Dashboard" />
      </View>
    </Screen>
  );
};
