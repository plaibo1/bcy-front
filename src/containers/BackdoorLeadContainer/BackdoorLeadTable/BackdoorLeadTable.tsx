import { Table } from "antd";
import { type IBackdoorLead } from "../../../types/api/backdoorLeadTypes";
import { type ColumnsType } from "antd/es/table";
import { type TableRowSelection } from "antd/es/table/interface";
import { TableProps } from "antd/lib";
import { DateTimeCeil } from "../../../components/Ceils/DateTimeCeil";

const columns: ColumnsType<IBackdoorLead> = [
  Table.SELECTION_COLUMN,
  {
    title: "Источник",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "ФИО",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Регион",
    dataIndex: "region",
    key: "region",
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
    title: "Лог",
    dataIndex: "log",
    key: "log",
  },
  {
    title: "Дата",
    render: (_, record) => {
      return <DateTimeCeil value={record.audit.createdDate} />;
    },
  },
];

export const BackdoorLeadTable = ({
  data,
  tableProps,
  selectedRowKeys,
  setSelectedRowKeys,
}: {
  data?: IBackdoorLead[];
  tableProps?: TableProps<IBackdoorLead>;
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
}) => {
  const rowSelection: TableRowSelection<IBackdoorLead> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    type: "checkbox",
  };

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
      {...tableProps}
    />
  );
};
