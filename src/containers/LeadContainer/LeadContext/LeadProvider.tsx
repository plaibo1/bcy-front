import { Key, useEffect, useState, type ReactNode } from "react";
import { LeadContext } from "./LeadContext";
import { IBusinessObject } from "../../../types/api/businessObjectTypes";

export const LeadProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: {
    leadsData: IBusinessObject[];
    selectedLeads: Key[];
    filters: IFilter[];
    entityId?: string;
  };
}) => {
  const [leads, setLeads] = useState<IBusinessObject[]>(value.leadsData);

  useEffect(() => {
    setLeads(value.leadsData);
  }, [value]);

  return (
    <LeadContext.Provider
      value={{
        data: leads,
        setLeads,
        selectedLeads: value.selectedLeads,
        filters: value.filters,
        entityId: value.entityId,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};
