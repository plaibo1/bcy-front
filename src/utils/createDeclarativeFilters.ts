import { type FilterFormCreateMap } from "../types/filterTypes";

export const createDeclarativeFilters = <T extends Record<string, unknown>>(
  fields: FilterFormCreateMap<T>,
  values: Record<keyof T, (string | number | boolean) | string[]>
): IFilter[] => {
  return Object.entries(values).map(([key, value]) => {
    const customFilter = fields[key as keyof T]?.customFilterValue;

    if (customFilter) {
      return {
        operation: "or",
        values: customFilter(value),
      } as unknown as IFilter;
    }

    const field = fields[key as keyof T];

    const processedValue = field?.valueResolver
      ? field.valueResolver(value)
      : value;

    const finalValues = Array.isArray(processedValue)
      ? processedValue
      : [processedValue];

    return {
      field: field!.field as string,
      operation: field!.operation || "equal",
      values: finalValues,
    };
  });
};
