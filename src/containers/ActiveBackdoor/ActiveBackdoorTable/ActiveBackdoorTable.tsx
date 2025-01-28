import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IActiveBackdoor } from "../../../types/api/activeBackdoorsTypes";
import { DateTimeCeil } from "../../../components/Ceils/DateTimeCeil";
import { RemoveActiveBackdoor } from "./ActionButtons";

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
    />
  );
};
