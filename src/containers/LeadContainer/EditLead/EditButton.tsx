import { useState } from "react";
import { Button, Modal, Typography } from "antd";

import { EditOutlined } from "@ant-design/icons";

import { type IEntityField } from "../../../types/api/entityFieldsTypes";
import { type IBusinessObject } from "../../../types/api/businessObjectTypes";
import { EditForm } from "./EditForm";

export interface IEditProps {
  boItem: IBusinessObject;
  entityId: string;
  entityFields: IEntityField[];
  index: number;
  name: string;
}

export const EditButton = ({
  boItem,
  entityId,
  entityFields,
  index,
  name,
}: IEditProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" icon={<EditOutlined />} onClick={showModal} />

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={null}
        destroyOnClose
      >
        <Typography.Title level={3} style={{ marginBottom: 32 }}>
          Редактирование лида
        </Typography.Title>

        <EditForm
          entityFields={entityFields}
          boItem={boItem}
          entityId={entityId}
          cancel={handleCancel}
          index={index}
          name={name}
        />
      </Modal>
    </>
  );
};
