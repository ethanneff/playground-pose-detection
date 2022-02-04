import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Landing, Results, Settings, Workout } from "../../screens";
import { RouteParams } from "../../types";

const Stack = createNativeStackNavigator<RouteParams>();

export const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="landing"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={Landing} name="landing" />
        <Stack.Screen component={Workout} name="workout" />
        <Stack.Screen component={Results} name="results" />
        <Stack.Screen component={Settings} name="settings" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
