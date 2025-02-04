import { Button, Flex, Spin, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { IActiveBackdoor } from "../../../types/api/activeBackdoorsTypes";
import { DateTimeCeil } from "../../../components/Ceils/DateTimeCeil";
import { RemoveActiveBackdoor } from "./ActionButtons";
import { useGetConfigurationsQuery } from "../../../store/api/configuratorBackdoorApi";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router";

const columns: ColumnsType<IActiveBackdoor> = [
  {
    title: "URL",
    dataIndex: "url",

    render: (url) => {
      return (
        <a target="_blank" href={url}>
          {url}
        </a>
      );
    },
  },
  {
    title: "Статус",
    dataIndex: "status",

    render: (status) => {
      return <Tag color="geekblue">{status}</Tag>;
    },
  },
  {
    title: "Клиент",
    dataIndex: "client",
    render: (client) => {
      return (
        <div>
          <b>
            {client.firstName} {client.lastName} {client.middleName}
          </b>
          <br />
          <code>{client.email}</code>
        </div>
      );
    },
  },
  {
    title: "Дата создания",
    dataIndex: "createdDate",

    render: (createdDate) => {
      return <DateTimeCeil value={createdDate} />;
    },
  },
  {
    dataIndex: "id",
    render: (id) => {
      return <RemoveActiveBackdoor id={id} />;
    },
  },
];

const ExpandedRow = ({ backdoorId }: { backdoorId: string }) => {
  const { data, isLoading } = useGetConfigurationsQuery({
    filters: [
      { field: "backdoorId", operation: "equal", values: [backdoorId] },
    ],
  });

  if (isLoading)
    return (
      <Flex justify="center" align="center" style={{ padding: 8 }}>
        <Spin />
      </Flex>
    );

  return (
    <div style={{ padding: 8 }}>
      <Typography.Title style={{ marginTop: 0 }} level={5}>
        Конфигурации:
      </Typography.Title>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link to={`/active-backdoors/${backdoorId}/new`}>
          <Button icon={<PlusOutlined />} type="primary" size="middle" />
        </Link>

        {data?.data.map(({ id, order }) => (
          <Link to={`/active-backdoors/${backdoorId}/${id}`}>
            <Button icon={<SettingOutlined />} size="middle">
              {order.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const ActiveBackdoorTable = ({
  data,
  isLoading,
}: {
  data?: IActiveBackdoor[];
  isLoading: boolean;
}) => {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => {
          return <ExpandedRow backdoorId={record.id} />;
        },
      }}
    />
  );
};
