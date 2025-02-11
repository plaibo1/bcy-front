import { FiltersButton } from "../../../components/FiltersButton";
import { CreateFilters } from "../../../components/CreateFilters";
import { FilterFormCreateMap } from "../../../types/filterTypes";

type ClientFilters = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  comment: string;
};

const fields: FilterFormCreateMap<ClientFilters> = {
  firstName: { field: "firstName", label: "Имя", operation: "starts with" },
  lastName: { field: "lastName", label: "Фамилия", operation: "starts with" },
  middleName: {
    field: "middleName",
    label: "Отчество",
    operation: "starts with",
  },
  email: {
    field: "email",
    label: "Email",
    rules: [{ type: "email", message: "Некорректный email" }],
  },
  comment: {
    field: "comment",
    label: "Комментарий",
    operation: "contains",
  },
};

export const ClientsFilters = ({
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
