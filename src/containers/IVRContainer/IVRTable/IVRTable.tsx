import { type TableProps } from "antd/lib/table";
import { type TableRowSelection } from "antd/es/table/interface";
import { type IVR } from "../../../types/api/ivrTypes";

import { Table } from "antd";
import { columns } from "./columns";

export const IVRTable = ({
  data,
  tableProps,
  selectedRowKeys,
  setSelectedRowKeys,
}: {
  data?: IVR[];
  tableProps?: TableProps<IVR>;
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
}) => {
  const rowSelection: TableRowSelection<IVR> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    type: "checkbox",
  };

  const handleRowClick = (record: IVR, event: React.MouseEvent) => {
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
