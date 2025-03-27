import { FiltersButton } from "../../../components/FiltersButton";

import { CreateFilters } from "../../../components/CreateFilters";
import { FilterFormCreateMap } from "../../../types/filterTypes";
import dayjs from "dayjs";
import { IActiveBackdoor } from "../../../types/api/activeBackdoorsTypes";
import { Select } from "antd";

const fields: FilterFormCreateMap<
  IActiveBackdoor & { createdDate: string; updatedDate: string }
> = {
  url: {
    field: "url",
    label: "URL",
    operation: "equal",
    colSpan: 4,
    rules: [{ type: "url", message: "Некорректный URL" }],
  },

  clientId: {
    field: "clientId",
    label: "ID клиента",
    operation: "equal",
    colSpan: 4,
  },

  status: {
    field: "status",
    label: "Статус",
    operation: "equal",
    colSpan: 4,
    customComponent: () => {
      return (
        <Select>
          <Select.Option value="REFRESH">Обновлен</Select.Option>
          <Select.Option value="ERROR">Ошибка</Select.Option>
        </Select>
      );
    },
  },

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

export const ActiveBackdoorFilters = ({
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
