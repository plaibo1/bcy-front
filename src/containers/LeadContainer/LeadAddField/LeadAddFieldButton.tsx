import { Button, Modal } from "antd";

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

      <Modal
        title="Добавить поле"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
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
