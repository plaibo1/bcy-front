export interface IBackdoorLead {
  id: string;
  source: string;
  fullName: string;
  phone: string;
  region: string;
  email: string;
  comment: string;
  log: string;

  audit: {
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
  };
}
