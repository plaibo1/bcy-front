import { Divider, Select, Typography } from "antd";

import { ExcelByLeadIds, ScheduleLeads } from "./Actions";
import { useState } from "react";
import { ExcelByFilters } from "./Actions/ExcelByFilters";

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
  const [currentAction, setCurrentAction] = useState(0);

  const ActionComponent = actions[currentAction].component;

  return (
    <div>
      <Typography.Title style={{ marginBottom: 32 }} level={4}>
        Действия
      </Typography.Title>

      <Select
        size="large"
        value={currentAction}
        defaultValue={actions[0].key}
        onChange={(value) => setCurrentAction(value)}
        options={actions.map((action) => ({
          value: action.key,
          label: action.label,
        }))}
        style={{ width: "100%" }}
      />

      <Divider />

      <ActionComponent onCancel={onCancel} />
    </div>
  );
};
