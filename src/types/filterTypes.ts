import { type Rule } from "antd/es/form";

export type FilterFormCreateMap<T extends object> = {
  [K in keyof Partial<T>]: {
    field: K;
    operation?: FiltersOperations;
    valueResolver?: (value: unknown) => string | number | boolean | string[];
    label?: string;
    rules?: Rule[];
    colSpan?: number;
    type?:
      | "string"
      | "number"
      | "boolean"
      | "date"
      | "datetime"
      | "dateRange"
      | "dateTimeRange"
      | "region"
      | "phone";

    customComponent?: () => React.ReactNode;
  };
};
