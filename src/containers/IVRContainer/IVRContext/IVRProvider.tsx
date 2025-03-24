import { ReactNode } from "react";
import { IVRContext, type IVRContextType } from "./IVRContext";

export const IVRProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: IVRContextType;
}) => {
  return <IVRContext.Provider value={value}>{children}</IVRContext.Provider>;
};
