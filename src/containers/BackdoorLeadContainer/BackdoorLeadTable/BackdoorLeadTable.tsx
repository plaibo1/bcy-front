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
    render: (v) => {
      return (
        <div
          style={{
            maxWidth: 800,
            height: 120,
            wordBreak: "break-all",
            overflow: "auto",
          }}
        >
          {v}
        </div>
      );
    },
  },
  {
    title: "Лог",
    dataIndex: "log",
    key: "log",
  },
  {
    title: "Дата создания",
    render: (_, record) => {
      return <DateTimeCeil value={record.audit.createdDate} />;
    },
  },
  {
    title: "Дата обновления",
    render: (_, record) => {
      return <DateTimeCeil value={record.audit.updatedDate} />;
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

  const handleRowClick = (record: IBackdoorLead, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedRowKeys((prev) => {
        const alreadySelected = prev.includes(record.id);
        return alreadySelected
          ? prev.filter((id) => id !== record.id)
          : [...prev, record.id];
      });
    }
  };

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
      onRow={(record) => ({
        onClick: (event) => handleRowClick(record, event),
      })}
      {...tableProps}
    />
  );
};
