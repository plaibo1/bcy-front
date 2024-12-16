export interface IActiveBackdoor {
  id: string;
  url: string;
  clientId: string;
  status: string;
  createdDate: string;
}

export interface IActiveBackdoorCreate {
  url: string;
  clientId: string;
}
