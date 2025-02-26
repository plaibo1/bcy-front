import { createContext, Key } from "react";

export interface IBackdoorLeadContext {
  selectedBackdoorLeads: Key[];
  filters: IFilter[];
}

export const BackdoorLeadContext = createContext<IBackdoorLeadContext>({
  selectedBackdoorLeads: [],
  filters: [],
});
