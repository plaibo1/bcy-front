import { App, Button, Flex, Modal, Popconfirm, theme, Typography } from "antd";

import { EditOutlined } from "@ant-design/icons";

import { useState } from "react";
import { type IEntityField } from "../../../types/api/entityFieldsTypes";

import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteEntityFieldMutation } from "../../../store/api/entityFieldsApi";

export const EditLeadEntity = ({
  entityId,
  fields,
}: {
  entityId: string | undefined;
  fields: IEntityField[];
}) => {
  const {
    token: { colorBorder, borderRadiusLG },
  } = theme.useToken();
  const [deleteEntityFiled] = useDeleteEntityFieldMutation();
  const { notification, message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm = ({ fieldId }: { fieldId: string }) => {
    if (!entityId) {
      message.error("Выберите сущность");
      return;
    }

    deleteEntityFiled({ entityId, fieldId })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Поле успешно удалено",
        });
      });
  };

  return (
    <>
      <Button size="large" icon={<EditOutlined />} onClick={showModal}>
        Изменить сущность
      </Button>

      <Modal
        width={800}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <>
          <Typography.Title level={3}>Редактирование полей</Typography.Title>

          <Flex gap={16} vertical>
            {fields.map((field) => (
              <Flex
                align="center"
                justify="space-between"
                gap={16}
                style={{
                  padding: 12,
                  border: `1px solid ${colorBorder}`,
                  borderRadius: borderRadiusLG,
                }}
                key={field.id}
              >
                <Flex vertical>
                  <Typography style={{ fontWeight: "bold" }}>
                    {field.label}
                  </Typography>

                  <Typography style={{ fontFamily: "monospace" }}>
                    {field.name}
                  </Typography>
                </Flex>

                <Popconfirm
                  title="Удалить поле"
                  description="Вы уверены, что хотите удалить это поле?"
                  onConfirm={() => confirm({ fieldId: field.id })}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button icon={<DeleteOutlined />} />
                </Popconfirm>
              </Flex>
            ))}
          </Flex>
        </>
      </Modal>
    </>
  );
};
