import { FiltersButton } from "../../../components/FiltersButton";

import { CreateFilters } from "../../../components/CreateFilters";
import { FilterFormCreateMap } from "../../../types/filterTypes";
import { IBackdoorLead } from "../../../types/api/backdoorLeadTypes";
import dayjs from "dayjs";

const fields: FilterFormCreateMap<IBackdoorLead & { date: string }> = {
  fullName: { label: "Имя", field: "fullName" },
  email: {
    label: "Email",
    rules: [{ type: "email", message: "Некорректный email" }],
    field: "email",
  },
  comment: { label: "Комментарий", field: "comment" },
  source: {
    field: "source",
    label: "Источник",
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
  date: {
    field: "date",
    label: "Дата",
    operation: "between",
    type: "dateRange",
    colSpan: 7,
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
