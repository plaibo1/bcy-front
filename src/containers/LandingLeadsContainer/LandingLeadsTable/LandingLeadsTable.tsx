import { Table } from "antd";
import { TableProps } from "antd/lib";
import { ILandingLead } from "../../../types/api/landingLeadsTypes";
import { TableRowSelection } from "antd/es/table/interface";
import { columns } from "./columns";

export const LandingLeadsTable = ({
  data,
  tableProps,
  selectedRowKeys,
  setSelectedRowKeys,
}: {
  data?: ILandingLead[];
  tableProps?: TableProps<ILandingLead>;
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
}) => {
  const rowSelection: TableRowSelection<ILandingLead> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    type: "checkbox",
  };

  const handleRowClick = (record: ILandingLead, event: React.MouseEvent) => {
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
