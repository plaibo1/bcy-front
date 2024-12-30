import { Button, Modal, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ModalContent } from "./ModalContent";

export const AddLeadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Popover mouseEnterDelay={0.5} content="Добавить лида">
        <Button
          onClick={() => setIsModalOpen(true)}
          size="large"
          icon={<PlusOutlined />}
        />
      </Popover>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ModalContent onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
