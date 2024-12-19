import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IActiveBackdoor } from "../../../types/api/activeBackdoorsTypes";
import { DateTimeCeil } from "../../../components/Ceils/DateTimeCeil";

const columns: ColumnsType<IActiveBackdoor> = [
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
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
    key: "status",
    render: (status) => {
      return <Tag color="geekblue">{status}</Tag>;
    },
  },
  {
    title: "Клиент",
    dataIndex: "clientId",
    key: "clientId",
  },
  {
    title: "Дата создания",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (createdDate) => {
      return <DateTimeCeil value={createdDate} />;
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
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={false}
    />
  );
};
