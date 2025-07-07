import { createContext } from "react";

export interface LandingLeadsContextType {
  selectedLandingLeads: React.Key[];
  setSelectedLandingLeads: React.Dispatch<React.SetStateAction<React.Key[]>>;
  filters: IFilter[];
}

export const LandingLeadsContext = createContext<LandingLeadsContextType>({
  selectedLandingLeads: [],
  setSelectedLandingLeads: () => {},
  filters: [],
});
