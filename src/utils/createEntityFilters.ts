import { IEntityField } from "../types/api/entityFieldsTypes";
import dayjs from "dayjs";
// { "field": "name", "operation": "starts with", "values": ["Женек"] }

export const createEntityFilters = (
  filters: Record<string, string | number | boolean>,
  fields: IEntityField[]
): IFilter[] => {
  return Object.entries(filters).map(([field, value]) => {
    // field "name" - есть у всех лидов по дефолту и его никогда не булет в "fields"
    if (field === "name") {
      return {
        field,
        operation: "starts with",
        values: [value],
      };
    }

    const foundField = fields.find((f) => f.name === field);

    if (foundField!.type === "DATE") {
      return {
        field,
        operation: "equal",
        values: [dayjs(value as string).format("YYYY-MM-DD")],
      };
    }

    // TODO: add time
    if (foundField!.type === "DATETIME") {
      return {
        field,
        operation: "starts with",
        values: [dayjs(value as string).format("YYYY-MM-DD")],
      };
    }

    const isFieldStringType = foundField!.type === "STRING";
    const isFieldNumberType = foundField!.type === "NUMBER";

    return {
      field,
      operation: isFieldStringType ? "starts with" : "equal",
      values: [isFieldNumberType ? Number(value) : value],
    };
  });
};
