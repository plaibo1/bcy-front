import { IActiveBackdoor } from "./activeBackdoorsTypes";
import { IOrder } from "./ordersType";

export interface IBackdoorConfigurationItem {
  id: string;
  backdoor: IActiveBackdoor;
  order: IOrder;
  data: Record<string, string>;
}

export interface ICreateConfiguration {
  backdoorId: string;
  orderId: string;
  data: Record<string, string>;
}

export interface IConfigurationItem {
  type: string;
  isRequired: boolean;
  isReadOnly: boolean;
  isImmutable: boolean;
  isMultiple: boolean;
  isDynamic: boolean;
  title: string;

  listLabel?: string;
  formLabel?: string;
  filterLabel?: string;
  statusType?: string;

  isDeprecated?: boolean;

  items?: {
    ID: string;
    VALUE: string;
  }[];

  settings?: unknown;
  // settings?: Partial<{
  //   SIZE: number;
  //   ROWS: number;
  //   REGEXP: string;
  //   MIN_LENGTH: number;
  //   MAX_LENGTH: number;
  //   DEFAULT_VALUE: string;
  // }>;
}

export interface IConfigurationTime {
  start: number;
  finish: number;
  duration: number;
  processing: number;
  date_start: string;
  date_finish: string;
  operating_reset_at: number;
  operating: number;
}

export interface IConfigurationBackdoor {
  result: {
    [key: string]: IConfigurationItem;
  };

  time: IConfigurationTime;
}
