import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Button } from "react-native";
import { Screen, Text } from "../../components";
import { UseNavigation } from "../../types";

export const Settings = () => {
  const { goBack } = useNavigation<UseNavigation>();

  const handleNav = useCallback(() => goBack(), [goBack]);

  return (
    <Screen>
      <Text fontSize={10} textAlign="center" title="Settings" />
      <Button onPress={handleNav} title="Go Back" />
    </Screen>
  );
};
