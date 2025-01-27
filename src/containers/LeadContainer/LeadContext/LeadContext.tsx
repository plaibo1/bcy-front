import { createContext, Key, type Dispatch, type SetStateAction } from "react";
import { type IBusinessObject } from "../../../types/api/businessObjectTypes";

interface ILeadContext {
  data: IBusinessObject[];
  setLeads: Dispatch<SetStateAction<IBusinessObject[]>>;
  selectedLeads: Key[];
  filters: IFilter[];
  entityId?: string;
}

export const LeadContext = createContext<ILeadContext>({
  data: [],
  setLeads: () => {},
  selectedLeads: [],
  filters: [],
  entityId: undefined,
});
