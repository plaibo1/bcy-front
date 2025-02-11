import { Button, Modal } from "antd";
import { ActiveBackdoorCreateForm } from "../ActiveBackdoorCreateForm";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

export const CreateActiveBackdoor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        size="large"
        onClick={() => setIsModalOpen(true)}
      >
        Создать интеграцию
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ActiveBackdoorCreateForm onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
