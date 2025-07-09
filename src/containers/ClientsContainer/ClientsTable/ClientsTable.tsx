import { Button, Modal, Skeleton, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { IClient } from "../../../types/api/clientsType";
import { TableProps } from "antd/lib";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ClientsEditForm } from "../ClientsEditForm";
import { OrderCard } from "../../../components/OrderCard";

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
  {
    title: "ID Клиента",
    dataIndex: "id",
    key: "id",
  },
];

const ExpandedRow = ({ client }: { client: IClient }) => {
  return (
    <div style={{ padding: 8 }}>
      <Typography.Title style={{ marginTop: 0 }} level={5}>
        Заказы клиента:
      </Typography.Title>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {client.orders.map((order) => {
          return <OrderCard order={order} />;
        })}
      </div>
    </div>
  );
};

const EditClientButton = ({ client }: { client: IClient }) => {
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
      >
        <ClientsEditForm
          client={client}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export const ClientsTable = ({
  data,
  tableProps,
}: {
  data?: IClient[];
  tableProps: TableProps<IClient>;
}) => {
  if (!data) return <Skeleton active />;

  return (
    <Table
      rowKey="id"
      columns={[
        ...columns,
        {
          align: "center",
          render: (_, record) => {
            return <EditClientButton client={record} />;
          },
        },
      ]}
      dataSource={data}
      expandable={{
        defaultExpandAllRows: true,
        expandedRowRender: (record) => <ExpandedRow client={record} />,
        rowExpandable: (record) => record.orders.length > 0,
      }}
      {...tableProps}
    />
  );
};
