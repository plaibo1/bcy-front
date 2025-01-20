import { Button, Modal } from "antd";

import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { type IOrder } from "../../../types/api/ordersType";
import { OrdersEditForm } from "./OrdersEditForm";

export const OrdersEditButton = ({ order }: { order: IOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={() => setIsModalOpen(true)}
      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={650}
      >
        <OrdersEditForm order={order} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
