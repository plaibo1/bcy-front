import { useEffect, useState } from "react";
import { useRef } from "react";
import { TasksTable } from "./TasksTable";
import { useLazyGetTasksQuery } from "../../store/api/tasksApi";
import { PageTotalCountTag } from "../../components/PageTotalCountTag";
import { TasksFilters } from "./TasksFilters";

export const TasksContainer = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  const pageSizeRef = useRef(50);

  const [getTasks, { data, isLoading, isFetching }] = useLazyGetTasksQuery();

  useEffect(() => {
    getTasks({
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
  }, [getTasks]);

  const onFilters = (filters: IFilter[]) => {
    getTasks({
      filters,
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
    setFilters(filters);
  };

  return (
    <>
      <PageTotalCountTag
        count={data?.paging.totalRecordsAmount}
        isLoading={isLoading || isFetching}
      />

      <div style={{ marginBottom: 32, width: "100%" }}>
        <TasksFilters onFilters={onFilters} />
      </div>

      <TasksTable
        data={data?.data}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page, pageSize) => {
              pageSizeRef.current = pageSize;
              getTasks({
                paging: { currentPage: page - 1, recordsOnPage: pageSize },
                filters,
              });
            },
            current: (data?.paging.currentPage ?? 0) + 1,
            total: data?.paging.totalRecordsAmount || 1,
            pageSize: pageSizeRef.current,
            showSizeChanger: true,
          },
        }}
      />
    </>
  );
};
