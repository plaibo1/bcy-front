import { ITask } from "../../../types/api/tasksTypes";
import { Table, TableProps } from "antd/lib";
import { columns, tasksStatuses } from "./columns";
import { useGetSubTasksQuery } from "../../../store/api/tasksApi";
import { Alert, Divider, Flex, Skeleton, Tag, Typography } from "antd";
import { DateTimeCeil } from "../../../components/Ceils/DateTimeCeil";

const SubTaskCard = ({ taskId }: { taskId: string }) => {
  const { data, isLoading, isFetching } = useGetSubTasksQuery({
    paging: { currentPage: 0, recordsOnPage: 1000 },
    filters: [{ field: "sendTaskId", values: [taskId], operation: "equal" }],
  });

  if (isLoading || isFetching) return <Skeleton active />;

  return (
    <Flex wrap="wrap" gap={8}>
      {data?.data.map((subTask) => (
        <Flex
          gap={4}
          vertical
          align="start"
          key={subTask.id}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ececec",
            padding: 8,
            borderRadius: 12,
            minWidth: 300,
          }}
        >
          <Flex justify="space-between" align="start" style={{ width: "100%" }}>
            <DateTimeCeil value={subTask.sendDate} />
            <Tag color={tasksStatuses[subTask.status].color}>
              {tasksStatuses[subTask.status].title}
            </Tag>
          </Flex>

          <div>
            <div>
              <strong>Отправитель: </strong>
            </div>
            <Typography.Text style={{ fontSize: 14 }}>
              {subTask.destination}
            </Typography.Text>
          </div>

          <Divider style={{ margin: 4 }} />

          <Tag>{subTask.sendType}</Tag>

          {subTask.errorMessage && (
            <Alert
              showIcon
              type="error"
              description={subTask.errorMessage}
              style={{ fontSize: 13, width: "500px" }}
            />
          )}

          {/* <span style={{ fontFamily: "monospace", fontSize: 12 }}>
            {subTask.id}
          </span> */}
        </Flex>
      ))}
    </Flex>
  );
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
