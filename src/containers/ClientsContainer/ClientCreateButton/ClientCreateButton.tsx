import { Button, Modal } from "antd";
import { useState } from "react";
import { ClientCreateForm } from "../ClientCreateForm";
import { UserAddOutlined } from "@ant-design/icons";

export const ClientCreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        icon={<UserAddOutlined />}
        size="large"
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Добавить клиента
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ClientCreateForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
