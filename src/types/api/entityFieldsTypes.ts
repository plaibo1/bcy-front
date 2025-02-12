export type EntityType =
  | "STRING"
  | "TEXTAREA"
  | "NUMBER"
  | "BOOLEAN"
  | "DATETIME"
  | "DATE"
  | "EMAIL"
  | "STATUS"
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
  settings: {
    entityId: string;
    labelValues?: Record<string, string | null>;
  };
}

export interface IEntityFieldCreate {
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

export interface IEntityFieldUpdate {
  label: string;
  description: string;
  system: boolean;
  hiddenFromUser: boolean;
  hiddenFromUi: boolean;
  archived: boolean;
  readOnly: boolean;
  required: boolean;
}
