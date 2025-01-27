import { Button, Modal } from "antd";
import { useState } from "react";
import { LeadActions } from "./LeadActions";

export const LeadActionsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setIsModalOpen(true)}>
        Действия
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <LeadActions onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
