export interface IVR {
  id: string;
  fullName: string;
  phone: string;
  region: string;
  transcribation: {
    name: string;
    sum: string;
  };
  talkLink: string;
  status: string;
  sum: number;
  improved: boolean;
  audit: {
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
  };
}
