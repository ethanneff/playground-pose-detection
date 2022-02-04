import React from "react";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return <>{children}</>;
};
