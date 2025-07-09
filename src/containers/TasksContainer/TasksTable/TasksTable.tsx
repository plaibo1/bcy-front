import { ITask } from "../../../types/api/tasksTypes";
import { Table, TableProps } from "antd/lib";
import { columns } from "./columns";

const SubTaskCard = ({ taskId }: { taskId: string }) => {
  return <div>SubTaskCard {taskId}</div>;
};

export const TasksTable = ({
  data,
  tableProps,
}: {
  data?: ITask[];
  tableProps?: TableProps<ITask>;
}) => {
  return (
    <Table
      {...tableProps}
      rowKey="id"
      columns={columns}
      dataSource={data}
      expandable={{
        defaultExpandAllRows: true,
        expandedRowRender: (record) => <SubTaskCard taskId={record.id} />,
      }}
    />
  );
};
