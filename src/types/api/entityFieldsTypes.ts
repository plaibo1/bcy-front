export type EntityType =
  | "STRING"
  | "TEXTAREA"
  | "NUMBER"
  | "BOOLEAN"
  | "DATETIME"
  | "DATE"
  | "DURATION"
  | "JSONB"
  | "ARRAY"
  | "EMAIL"
  | "PHONE";

export interface IEntityField {
  id: string;
  entityId: string;
  name: string;
  label: string;
  description: string;
  type: EntityType;
  system: boolean;
  hiddenFromUser: boolean;
  hiddenFromUi: boolean;
  archived: boolean;
  readOnly: boolean;
  required: boolean;
  audit: {
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
  };
}

export interface IEntityCreate {
  name: string;
  label: string;
  description: string;
  type: EntityType;
  system: boolean;
  hiddenFromUser: boolean;
  hiddenFromUi: boolean;
  archived: boolean;
  readOnly: boolean;
  required: boolean;
}
