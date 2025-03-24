import { createContext, Key } from "react";

export interface IVRContextType {
  setSelectedIVRs: React.Dispatch<React.SetStateAction<React.Key[]>>;
  selectedIVRs: Key[];
  filters: IFilter[];
}

export const IVRContext = createContext<IVRContextType>({
  setSelectedIVRs: () => {},
  selectedIVRs: [],
  filters: [],
});
