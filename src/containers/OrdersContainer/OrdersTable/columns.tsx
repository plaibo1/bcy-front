import { ColumnsType } from "antd/es/table";
import { IOrder } from "../../../types/api/ordersType";
import { ordersStatuses } from "../../../consts";
import { Tag } from "antd";
import { OrdersEditButton } from "../OrdersEditButton";

export const columns: ColumnsType<IOrder> = [
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const { label, color } = ordersStatuses[status] || {
        label: status,
        color: "default",
      };

      return <Tag color={color}>{label}</Tag>;
    },
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Стоимость за лид",
    dataIndex: "costPerLead",
    key: "costPerLead",
  },
  {
    title: "Количество лидов",
    dataIndex: "leadCount",
    key: "leadCount",
  },
  {
    title: "Выполнено лидов",
    dataIndex: "executedLeadCount",
    key: "executedLeadCount",
  },
  {
    title: "Майлы",
    dataIndex: "mailsForSend",
    key: "mailsForSend",
    render: (mailsForSend: string[]) => {
      if (!mailsForSend || mailsForSend.length === 0) {
        return null;
      }

      return (
        <ul>
          {mailsForSend.map((mail) => (
            <li key={mail}>{mail}</li>
          ))}
        </ul>
      );
    },
  },
  {
    title: "Максимальный дефект",
    dataIndex: "maxDefect",
    key: "maxDefect",
  },
  {
    title: "ID Клиента",
    dataIndex: "clientId",
    key: "clientId",
  },
  {
    render: (_, record) => <OrdersEditButton order={record} />,
  },
];
