import { Flex, Typography } from "antd";
import { type IEntityField } from "../../../types/api/entityFieldsTypes";

import { EditLeadEditorField } from "./EditLeadEditorField";

export const EditLeadEditor = ({
  fields,
  onConfirm,
}: {
  fields: IEntityField[];
  onConfirm: (fieldId: string) => void;
}) => {
  return (
    <>
      <Typography.Title level={3}>Редактирование полей</Typography.Title>

      <Flex gap={16} vertical>
        {fields.map((field) => (
          <EditLeadEditorField
            key={field.id}
            field={field}
            onConfirm={onConfirm}
          />
        ))}
      </Flex>
    </>
  );
};
