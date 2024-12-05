import { Table, type TableProps } from "antd";
import { useContext } from "react";
import { LeadContext } from "../LeadContext";

interface ILeadTable extends TableProps {
  isLoading: boolean;
}

export const LeadTable = ({ isLoading, ...props }: ILeadTable) => {
  const { data: businessObjects } = useContext(LeadContext);

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      dataSource={businessObjects}
      {...props}
    />
  );
};
