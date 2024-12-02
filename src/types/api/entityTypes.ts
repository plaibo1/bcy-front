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

// TODO: IEntityCreate
