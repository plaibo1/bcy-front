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
};

export const OrdersFilters = ({
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
