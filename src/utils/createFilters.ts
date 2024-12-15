export const createFilters = (
  filters: Record<string, string | number | boolean>
): IFilter[] => {
  return Object.entries(filters).map(([field, value]) => {
    return {
      field,
      operation: "equal", // TODO: add other operations
      values: [value],
    };
  });
};
