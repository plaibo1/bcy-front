import { useState, type ReactNode } from "react";
import { LeadContext } from "./LeadContext";
import { IBusinessObject } from "../../../types/api/businessObjectTypes";

export const LeadProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: IBusinessObject[];
}) => {
  const [leads, setLeads] = useState<IBusinessObject[]>(value);

  return (
    <LeadContext.Provider value={{ data: leads, setLeads }}>
      {children}
    </LeadContext.Provider>
  );
};
