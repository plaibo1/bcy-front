import { useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Popconfirm,
  Space,
  theme,
  Typography,
} from "antd";
import { IEntityField } from "../../../types/api/entityFieldsTypes";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { EditLeadEntityForm } from "./EditLeadEntityForm";

export const EditLeadEditorField = ({
  field,
  onConfirm,
}: {
  field: IEntityField;
  onConfirm: (fieldId: string) => void;
}) => {
  const {
    token: { colorBorder, borderRadiusLG },
  } = theme.useToken();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      style={{
        padding: 12,
        border: `1px solid ${colorBorder}`,
        borderRadius: borderRadiusLG,
      }}
      key={field.id}
    >
      <Flex align="center" justify="space-between" gap={16}>
        <Flex vertical>
          <Typography style={{ fontWeight: "bold" }}>{field.label}</Typography>

          <Typography style={{ fontFamily: "monospace" }}>
            {field.name}
          </Typography>
        </Flex>

        <Space>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            type={isEditing ? "primary" : "default"}
            icon={<EditOutlined />}
          />

          <Popconfirm
            title="Удалить поле"
            description="Вы уверены, что хотите удалить это поле?"
            onConfirm={() => onConfirm(field.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      </Flex>

      {isEditing && (
        <>
          <Divider />
          <EditLeadEntityForm
            entityId={field.entityId}
            filedId={field.id}
            initialValues={field}
          />
        </>
      )}
    </div>
  );
};
