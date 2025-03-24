import { Select } from "antd";
import { CreateFilters } from "../../../components/CreateFilters";
import { FiltersButton } from "../../../components/FiltersButton";
import { IVR } from "../../../types/api/ivrTypes";
import { FilterFormCreateMap } from "../../../types/filterTypes";
import dayjs from "dayjs";

const fields: FilterFormCreateMap<
  IVR & { createdDate: string; updatedDate: string }
> = {
  fullName: {
    label: "Имя",
    field: "fullName",
    operation: "starts with",
    colSpan: 4,
  },
  phone: {
    field: "phone",
    label: "Телефон",
    type: "phone",
    colSpan: 4,
  },
  region: {
    field: "region",
    label: "Регион",
    type: "region",
    colSpan: 4,
  },
  sum: {
    field: "sum",
    label: "Сумма",
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
          <Select.Option value="NEW">Новый</Select.Option>
          <Select.Option value="SENT_TO_LEAD">Отправлен в лиды</Select.Option>
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

export const IVRFilters = ({
  onFilters,
}: {
  onFilters: (filters: IFilter[]) => void;
}) => {
  return (
    <FiltersButton>
      <CreateFilters
        formProps={{
          layout: "vertical",
          size: "large",
          style: { width: "100%" },
        }}
        fields={fields}
        onFilterChange={onFilters}
      />
    </FiltersButton>
  );
};
