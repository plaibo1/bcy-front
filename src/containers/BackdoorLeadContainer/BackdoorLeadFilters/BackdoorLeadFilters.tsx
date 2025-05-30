import { FiltersButton } from "../../../components/FiltersButton";

import { CreateFilters } from "../../../components/CreateFilters";
import { FilterFormCreateMap } from "../../../types/filterTypes";
import { IBackdoorLead } from "../../../types/api/backdoorLeadTypes";
import dayjs from "dayjs";

const fields: FilterFormCreateMap<
  IBackdoorLead & { createdDate: string; updatedDate: string }
> = {
  fullName: { label: "Имя", field: "fullName", operation: "starts with" },
  email: {
    label: "Email",
    rules: [{ type: "email", message: "Некорректный email" }],
    field: "email",
  },
  comment: { label: "Комментарий", field: "comment", operation: "contains" },
  source: {
    field: "source",
    label: "Источник",
    operation: "starts with",
  },
  phone: {
    field: "phone",
    label: "Телефон",
    type: "phone",
  },
  region: {
    field: "region",
    label: "Регион",
    type: "region",
  },

  // TODO: operation resolver
  createdDate: {
    field: "createdDate",
    label: "Дата создания",
    operation: "between",
    type: "dateRange",
    colSpan: 5,
    valueResolver: (value) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return "";
      }

      return value
        .filter(Boolean)
        .map((v) => dayjs(v).format("YYYY-MM-DDTHH:mm:ssZ"));
    },
  },

  updatedDate: {
    field: "updatedDate",
    label: "Дата обновления",
    operation: "between",
    type: "dateRange",
    colSpan: 5,
    valueResolver: (value) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return "";
      }

      return value
        .filter(Boolean)
        .map((v) => dayjs(v).format("YYYY-MM-DDTHH:mm:ssZ"));
    },
  },
};

export const BackdoorLeadFilters = ({
  onFilters,
}: {
  onFilters: (filters: IFilter[]) => void;
}) => {
  return (
    <FiltersButton>
      <CreateFilters
        formProps={{ layout: "vertical", size: "large" }}
        fields={fields}
        onFilterChange={onFilters}
      />
    </FiltersButton>
  );
};
