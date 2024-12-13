import { IEntityField } from "../types/api/entityFieldsTypes";
// { "field": "name", "operation": "starts with", "values": ["Женек"] }

export const createFilters = (
  filters: Record<string, string | number | boolean>,
  fields: IEntityField[]
): IFilter[] => {
  return Object.entries(filters).map(([field, value]) => {
    const foundField = fields.find((f) => f.name === field);

    const isFieldStringType = foundField!.type === "STRING";
    const iFieldNumberType = foundField!.type === "NUMBER";

    return {
      field,
      operation: isFieldStringType ? "starts with" : "equal",
      values: [iFieldNumberType ? Number(value) : value],
    };
  });
};
