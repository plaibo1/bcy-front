import { IOrder } from "./ordersType";

export interface ITask {
  id: string;
  entityId: string;
  order: IOrder;
  status: string;
  startDate: string | null;
  durationInMinutes: number | null;
  audit: IAudit;
}

export interface ISubTask {
  id: string;
  dataId: string;
  sendTaskId: string; // no view
  sendDate: string;
  status: string;
  sendType: string;
  destination: string;
  errorMessage: null | string;
}
