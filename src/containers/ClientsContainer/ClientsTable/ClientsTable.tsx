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
          title: "Действие",
          align: "center",
          render: (_, record) => {
            return <EditClientButton client={record} />;
          },
        },
      ]}
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
