import { ExcelByLeadIds, ScheduleLeads } from "./Actions";
import { ExcelByFilters } from "./Actions/ExcelByFilters";
import { ActionsSelect } from "../../../components/ActionsSelect";

const actions = [
  {
    key: 0,
    label: "Создать задачу для отправки в интервал",
    component: ScheduleLeads,
  },
  {
    key: 1,
    label: "Создать Excel-файл по лидам",
    component: ExcelByLeadIds,
  },
  {
    key: 2,
    label: "Создать Excel-файл по фильтрам",
    component: ExcelByFilters,
  },
];

export const LeadActions = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <div>
      <ActionsSelect actions={actions} onCancel={onCancel} />
    </div>
  );
};
