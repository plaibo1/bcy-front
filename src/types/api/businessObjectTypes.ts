export interface IBusinessObject {
  id: string;
  name: string;
  entityId: string;
  data: Record<string, unknown>;
  sourceType: "FRONT" | "BACKDOOR" | string;
  sourceId: string;

  audit: {
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
  };
}

export interface IBusinessObjectCreate {
  name: string;
  data: Record<string, unknown>;
}
