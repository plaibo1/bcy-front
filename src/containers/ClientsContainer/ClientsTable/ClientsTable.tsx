import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IClient } from "../../../types/api/clientsType";
import { TableProps } from "antd/lib";

const columns: ColumnsType<IClient> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Отчество",
    dataIndex: "middleName",
    key: "middleName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Комментарий",
    dataIndex: "comment",
    key: "comment",
  },
];

export const ClientsTable = ({
  data,
  tableProps,
}: {
  data: IClient[];
  tableProps: TableProps<IClient>;
}) => {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>{record.comment}</p>
        ),
        rowExpandable: (record) => record.orders.length > 0,
      }}
      {...tableProps}
    />
  );
};
