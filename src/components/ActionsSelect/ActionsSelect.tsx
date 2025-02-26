import { Divider, Select, Typography } from "antd";
import { useState } from "react";

interface ActionsSelectProps {
  onCancel: () => void;
  actions: {
    key: number;
    label: string;
    component: React.FC<{ onCancel: () => void }>;
  }[];
  defaultTitle?: string;
  children?: React.ReactNode;
}

export const ActionsSelect = ({
  onCancel,
  actions,
  defaultTitle,
  children,
}: ActionsSelectProps) => {
  const [currentAction, setCurrentAction] = useState(0);

  const ActionComponent = actions[currentAction].component;

  return (
    <>
      {children || (
        <Typography.Title style={{ marginBottom: 32 }} level={4}>
          {defaultTitle || "Действия"}
        </Typography.Title>
      )}

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
    </>
  );
};
