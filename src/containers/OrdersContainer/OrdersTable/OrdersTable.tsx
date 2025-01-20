import { Table } from "antd";
import { IOrder } from "../../../types/api/ordersType";
import { TableProps } from "antd/lib";
import { columns } from "./columns";

export const OrdersTable = ({
  data,
  tableProps,
}: {
  data?: IOrder[];
  tableProps?: TableProps<IOrder>;
}) => {
  return (
    <Table rowKey="id" columns={columns} dataSource={data} {...tableProps} />
  );
};
