import React from "react";
import { AppProvider, NavigationProvider, ReduxProvider } from "./middleware";

export const Root = () => {
  return (
    <ReduxProvider>
      <AppProvider>
        <NavigationProvider />
      </AppProvider>
    </ReduxProvider>
  );
};
