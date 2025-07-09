import { ColumnType } from "antd/es/table";
import { ITask } from "../../../types/api/tasksTypes";
import { Tag } from "antd";
import { DateTimeCeil } from "../../../components/Ceils/DateTimeCeil";
import { OrderCard } from "../../../components/OrderCard";

export const tasksStatuses: Record<string, { title: string; color: string }> = {
  IN_PROGRESS: { title: "В прогрессе", color: "blue" },
  EXECUTED: { title: "Выполнен", color: "green" },
  ERROR: { title: "Выполнен с ошибкой", color: "red" },
};

export const columns: ColumnType<ITask>[] = [
  {
    title: "ID Задачи",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Заказ",
    dataIndex: "order",
    key: "order",
    render: (order) => {
      return <OrderCard order={order} />;
    },
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      if (!tasksStatuses[status]) {
        return <Tag color="default">{status}</Tag>;
      }

      return (
        <Tag color={tasksStatuses[status].color}>
          {tasksStatuses[status].title}
        </Tag>
      );
    },
  },
  {
    title: "Дата начала отправки",
    dataIndex: "startDate",
    key: "startDate",
    render: (date) => {
      if (!date) {
        return null;
      }

      return <DateTimeCeil value={date} />;
    },
  },
  {
    title: "Интервал отправки",
    dataIndex: "durationInMinutes",
    key: "durationInMinutes",
    render: (durationInMinutes) => {
      if (!durationInMinutes) {
        return null;
      }

      return durationInMinutes + " мин";
    },
  },
  {
    title: "Дата создания",
    dataIndex: "audit",
    key: "audit",
    render: (audit) => {
      if (!audit) {
        return null;
      }

      return <DateTimeCeil value={audit.createdDate} />;
    },
  },
];
