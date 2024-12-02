export interface IBusinessObject {
  id: string;
  name: string;
  entityId: string;
  data: Record<string, unknown>;

  audit: {
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
  };
}

export interface IBusinessObjectCreate {
  data: Record<string, unknown>;
}
