import { App, Button, Modal } from "antd";

import { EditOutlined } from "@ant-design/icons";

import { useState } from "react";
import { type IEntityField } from "../../../types/api/entityFieldsTypes";

import { useDeleteEntityFieldMutation } from "../../../store/api/entityFieldsApi";
import { EditLeadEditor } from "./EditLeadEditor";

export const EditLeadEntity = ({
  entityId,
  fields,
}: {
  entityId: string | undefined;
  fields: IEntityField[];
}) => {
  const [deleteEntityFiled] = useDeleteEntityFieldMutation();
  const { notification, message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm = (fieldId: string) => {
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
        <EditLeadEditor fields={fields} onConfirm={confirm} />
      </Modal>
    </>
  );
};
