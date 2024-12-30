export interface IEntity {
  id: string;
  name: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  settings: {
    entityId: string;
  };
  system: boolean;
  archived: boolean;
}

export interface IEntityCreate {
  name: string;
  label: string;
  description: string;
  icon?: string;
  color?: string;
  system?: boolean;
  archived?: boolean;
}
