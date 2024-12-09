import { IEntityField } from "../types/api/entityFieldsTypes";
// { "field": "name", "operation": "starts with", "values": ["Женек"] }

export const createFilters = (
  filters: Record<string, string | number | boolean>,
  fields: IEntityField[]
): IFilter[] => {
  return Object.entries(filters).map(([field, value]) => {
    const isFieldStringType = fields.find((f) => f.type === "STRING");

    return {
      field,
      operation: isFieldStringType ? "starts with" : "equal",
      values: [value],
    };
  });
};
