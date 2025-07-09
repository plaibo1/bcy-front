import { Flex, Tag, Typography } from "antd";
import { IOrder } from "../../types/api/ordersType";
import { ordersStatuses } from "../../consts";
import { UserOutlined } from "@ant-design/icons";

export const OrderCard = ({ order }: { order: IOrder }) => {
  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <div>
        <Typography.Text type="success">{order.countLeadsSent}</Typography.Text>{" "}
        / <Typography.Text strong>{order.leadCount}</Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        key={order.id}
      >
        <Flex gap={4}>
          <UserOutlined />
          {order.name}
        </Flex>

        <Tag
          style={{ marginLeft: 12 }}
          color={ordersStatuses[order.status].color}
        >
          {ordersStatuses[order.status].label}
        </Tag>
      </div>
      <code style={{ fontSize: 12 }}>{order.id}</code>
    </div>
  );
};
