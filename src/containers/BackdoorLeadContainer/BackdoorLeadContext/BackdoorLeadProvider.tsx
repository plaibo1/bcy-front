import { ReactNode } from "react";
import {
  BackdoorLeadContext,
  IBackdoorLeadContext,
} from "./BackdoorLeadContext";

export const BackdoorLeadProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: IBackdoorLeadContext;
}) => {
  return (
    <BackdoorLeadContext.Provider value={value}>
      {children}
    </BackdoorLeadContext.Provider>
  );
};
