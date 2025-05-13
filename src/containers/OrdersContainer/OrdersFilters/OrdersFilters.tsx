import { Select } from "antd";
import { CreateFilters } from "../../../components/CreateFilters";
import { FiltersButton } from "../../../components/FiltersButton";
import { type FilterFormCreateMap } from "../../../types/filterTypes";

interface OrdersFilters {
  name?: string;
  costPerLead?: number;
  leadCount?: number;
  maxDefect?: number;
  executedLeadCount?: number;

  clientId?: string;
  status?: string;
  //   categoryId?: string;
}

const fields: FilterFormCreateMap<OrdersFilters> = {
  name: { label: "Название", field: "name", operation: "starts with" },
  costPerLead: { label: "Стоимость за лид", field: "costPerLead" },
  leadCount: { label: "Количество лидов", field: "leadCount" },
  maxDefect: { label: "Макс. дефектность", field: "maxDefect" },
  executedLeadCount: {
    label: "Выполнено лидов",
    field: "executedLeadCount",
  },
  clientId: { label: "ID Клиента", field: "clientId" },
  status: {
    field: "status",
    label: "Статус",
    operation: "equal",
    colSpan: 4,
    customComponent: () => {
      return (
        <Select>
          <Select.Option value={null}>Не выбрано</Select.Option>
          <Select.Option value="IN_PROGRESS">В работе</Select.Option>
          <Select.Option value="EXECUTED">Выполнен</Select.Option>
        </Select>
      );
    },
  },
};

export const OrdersFilters = ({
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
          initialValues: { status: "IN_PROGRESS" },
        }}
        fields={fields}
        onFilterChange={onFilters}
      />
    </FiltersButton>
  );
};
