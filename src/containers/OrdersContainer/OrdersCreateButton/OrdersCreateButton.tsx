import { Button, Modal } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { OrdersCreateForm } from "./OrdersCreateForm/OrdersCreateForm";

export const OrdersCreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        size="large"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Создать заказ
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={650}
      >
        <OrdersCreateForm onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
