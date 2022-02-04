import React from "react";
import { useOrientation } from "./useOrientation";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  useOrientation();
  return <>{children}</>;
};
