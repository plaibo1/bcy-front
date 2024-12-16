import { Button, Modal } from "antd";
import { ActiveBackdoorCreateForm } from "../ActiveBackdoorCreateForm";
import { useState } from "react";

export const CreateActiveBackdoor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" size="large" onClick={() => setIsModalOpen(true)}>
        Создать бэкдор
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ActiveBackdoorCreateForm />
      </Modal>
    </>
  );
};
