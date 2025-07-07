import { CreateFilters } from "../../../components/CreateFilters";
import { FiltersButton } from "../../../components/FiltersButton";
import { FilterFormCreateMap } from "../../../types/filterTypes";
import { ILandingLead } from "../../../types/api/landingLeadsTypes";
import dayjs from "dayjs";

const fields: FilterFormCreateMap<ILandingLead & { createdDate: string }> = {
  lastName: {
    label: "Фамилия",
    field: "lastName",
    operation: "starts with",
    colSpan: 4,
  },
  firstName: {
    label: "Имя",
    field: "firstName",
    operation: "starts with",
    colSpan: 4,
  },
  middleName: {
    label: "Отчество",
    field: "middleName",
    operation: "starts with",
    colSpan: 4,
  },
  phone: {
    field: "phone",
    label: "Телефон",
    type: "phone",
    colSpan: 4,
  },
  email: {
    label: "Email",
    field: "email",
    operation: "starts with",
    colSpan: 4,
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
};

export const LandingLeadsFilters = ({
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
