// ==================================== //
// =============GLOBAL TYPES=========== //
// ==================================== //

interface Pagination {
  currentPage: number;
  totalPageAmount: number;
  recordsOnPage: number;
  totalRecordsAmount: number;
}

// TODO: type values of filters
interface Filters {
  field: "string";
  secondField: "string";
  operation: "gt";
  values: Record<string, string>[];
}

interface Sort {
  field: "string";
  sortType: "ASC" | "DESC";
  order: number;
}

interface PageResponse<T> {
  paging: Pagination;
  filters: Filters[];
  sort: Sort[];
  data: T[];
}

interface PageRequest {
  paging?: Partial<Pagination>;
  filters?: Partial<Filters>[];
  sort?: Partial<Sort>[];
}
