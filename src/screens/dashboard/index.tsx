import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Button, Dimensions } from "react-native";
import { Screen, Spacing, Text } from "../../components";
import { UseNavigation } from "../../types";

const { width } = Dimensions.get("window");

export const Dashboard = () => {
  const { goBack } = useNavigation<UseNavigation>();

  const handleBegin = useCallback(() => goBack(), [goBack]);

  return (
    <Screen>
      <Spacing padding={10} />
      <Text fontSize={10} textAlign="center" title="Dashboard" />
      <Button onPress={handleBegin} title="go back" />
    </Screen>
  );
};
