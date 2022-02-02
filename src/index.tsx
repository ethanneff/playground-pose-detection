import React from "react";
import { ReduxProvider } from "./redux";
import { App } from "./screens";

export const Root = () => {
  return (
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
};
