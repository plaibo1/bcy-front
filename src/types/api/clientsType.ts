import { type IOrder } from "./ordersType";

export interface IClient {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  comment: string;
  orders: IOrder[];
}
