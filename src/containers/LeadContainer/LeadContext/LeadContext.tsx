import { createContext, type Dispatch, type SetStateAction } from "react";
import { type IBusinessObject } from "../../../types/api/businessObjectTypes";

interface ILeadContext {
  data: IBusinessObject[];
  setLeads: Dispatch<SetStateAction<IBusinessObject[]>>;
}

export const LeadContext = createContext<ILeadContext>({
  data: [],
  setLeads: () => {},
});
