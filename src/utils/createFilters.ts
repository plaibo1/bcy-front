export const createFilters = (
  filters: Record<string, string | number | boolean>,
  options?: { operation?: FiltersOperations }
): IFilter[] => {
  return Object.entries(filters).map(([field, value]) => {
    return {
      field,
      // переписать, это исключителньо для теста
      operation: options?.operation || "equal",
      values: [value],
    };
  });
};
