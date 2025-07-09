import { Select } from "antd";
import { CreateFilters } from "../../../components/CreateFilters";
import { FiltersButton } from "../../../components/FiltersButton";
import { ITask } from "../../../types/api/tasksTypes";
import { FilterFormCreateMap } from "../../../types/filterTypes";
import dayjs from "dayjs";

const fields: FilterFormCreateMap<ITask & { createdDate: string }> = {
  order: {
    field: "order.name",
    label: "Имя Заказа",
    operation: "starts with",
  },

  status: {
    field: "status",
    label: "Статус",
    operation: "equal",
    customComponent: () => {
      return (
        <Select>
          <Select.Option value={null}>Не выбрано</Select.Option>
          <Select.Option value="IN_PROGRESS">В работе</Select.Option>
          <Select.Option value="EXECUTED">Выполнен</Select.Option>
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
    valueResolver: (value) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return "";
      }

      return value
        .filter(Boolean)
        .map((v) => dayjs(v).format("YYYY-MM-DDTHH:mm:ssZ"));
    },
  },

  startDate: {
    field: "startDate",
    type: "dateRange",
    label: "Дата начала отправки",
    operation: "between",
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

export const TasksFilters = ({
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
