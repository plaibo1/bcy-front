// ==================================== //
// =============GLOBAL TYPES=========== //
// ==================================== //

interface IPagination {
  currentPage: number;
  totalPageAmount: number;
  recordsOnPage: number;
  totalRecordsAmount: number;
}

/**
 * Represents a filter used for querying data.
 *
 * @property field - The name of the field to filter by.
 * @property operation - The operation to perform on the field.
 * @property values - The values to use for the filtering operation, which can be of type string or number.
 */
interface IFilter {
  field: string;
  operation: FiltersOperations;
  values: (string | number | boolean)[];
}

interface ISort {
  field: string;
  sortType: "ASC" | "DESC";
  order: number;
}

interface PageResponse<T> {
  paging: IPagination;
  filters: IFilter[];
  sort: ISort[];
  data: T[];
}

interface PageRequest {
  paging?: Partial<IPagination>;
  filters?: IFilter[];
  sort?: ISort[];
}

type FiltersOperations =
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "equal"
  | "not equal"
  | "contains"
  | "in"
  | "not in"
  | "is null"
  | "is not null"
  | "is empty"
  | "is not empty"
  | "between"
  | "is null or not equal"
  | "starts with"
  | "ends with"
  | "or"
  | "and"
  | "not"
  | "true"
  | "false";

// ================ BASIC FILTERS  ================= //

// {
//   filters: [
//     { field: "name", operation: "in", values: ["my_task", "my_task_2"] },
//     { field: "description_custom", operation: "equal", values: ["custom new"] },
//   ],
//   sorts: [{ field: "name", sortType: "DESC", order: 1.0 }],
//   paging: { currentPage: 0, recordsOnPage: 9223372036854775807 },
// }

// ================ ADVANCED FILTERS  ================= //

// {
//   filters: [
//     { field: "description", operation: "is not null" },
//     {
//       operation: "or",
//       values: [
//         { field: "name", operation: "equal", values: ["string"] },
//         { field: "name", operation: "equal", values: ["email"] },
//       ],
//     },
//   ],
//   sorts: [{ field: "name", sortType: "ASC", order: 1.0 }],
//   paging: { currentPage: 0, recordsOnPage: 9223372036854775807 },
// };
