import { type IClient } from "./clientsType";

export interface IActiveBackdoor {
  id: string;
  url: string;
  client: IClient;
  status: string;
  createdDate: string;
}

export interface IActiveBackdoorCreate {
  url: string;
  clientId: string;
}
