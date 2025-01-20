import { Button, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IClient } from "../../../types/api/clientsType";
import { TableProps } from "antd/lib";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ClientsEditForm } from "../ClientsEditForm";

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
  data: IClient[];
  tableProps: TableProps<IClient>;
}) => {
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
        expandedRowRender: (record) => (
          // TODO: Доабвить карточку заказа
          <code>
            <pre>{JSON.stringify(record.orders, null, 2)}</pre>
          </code>
        ),
        rowExpandable: (record) => record.orders.length > 0,
      }}
      {...tableProps}
    />
  );
};
