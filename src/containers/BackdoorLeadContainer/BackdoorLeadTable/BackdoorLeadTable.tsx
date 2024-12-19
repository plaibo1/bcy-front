import { Table } from "antd";
import { type IBackdoorLead } from "../../../types/api/backdoorLeadTypes";
import { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import { type TableRowSelection } from "antd/es/table/interface";
import { TableProps } from "antd/lib";

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
];

export const BackdoorLeadTable = ({
  data,
  tableProps,
}: {
  data?: IBackdoorLead[];
  tableProps?: TableProps<IBackdoorLead>;
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IBackdoorLead> = {
    selectedRowKeys,
    onChange: onSelectChange,
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
