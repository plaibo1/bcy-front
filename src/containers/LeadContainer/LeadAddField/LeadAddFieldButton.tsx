import { Button, Modal, Typography } from "antd";

import { PlusCircleFilled } from "@ant-design/icons";
import { LeadAddFieldForm } from "./LeadAddFieldForm";
import { useState } from "react";

export const LeadAddFieldButton = ({
  entityId,
  onSubmit,
}: {
  entityId: string | undefined;
  onSubmit: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        size="large"
        type="primary"
        icon={<PlusCircleFilled />}
        onClick={showModal}
      >
        Добавить поле
      </Button>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Typography.Title level={3}>Добавить поле</Typography.Title>

        <LeadAddFieldForm
          cancel={handleCancel}
          entityId={entityId}
          onSubmit={() => {
            onSubmit();
            handleCancel();
          }}
        />
      </Modal>
    </>
  );
};
