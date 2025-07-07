import { ReactNode } from "react";
import {
  LandingLeadsContext,
  LandingLeadsContextType,
} from "./LandingLeadsContext";

export const LandingLeadsProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: LandingLeadsContextType;
}) => {
  return (
    <LandingLeadsContext.Provider value={value}>
      {children}
    </LandingLeadsContext.Provider>
  );
};
