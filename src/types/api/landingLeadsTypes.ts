export interface ILandingLead {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email?: string;
  passportSerial?: string;
  passportNumber?: string;
  address?: string;
  amountOwed?: number;

  audit: {
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
  };
}
