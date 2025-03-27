import { Button, Flex, Space } from "antd";
import {
  useLazyGetActiveBackdoorsPageQuery,
  useRefreshActiveBackdoorMutation,
} from "../../store/api/activeBackdoorsApi";
import { CreateActiveBackdoor } from "./CreateActiveBackdoor";
import { ActiveBackdoorTable } from "./ActiveBackdoorTable";
import { ReloadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { ActiveBackdoorFilters } from "./ActiveBackdoorFilters";

export const ActiveBackdoor = () => {
  const [getActiveBackdoors, { data, isLoading, isFetching }] =
    useLazyGetActiveBackdoorsPageQuery();

  const [refreshActiveBackdoor] = useRefreshActiveBackdoorMutation();

  const pageSizeRef = useRef(50);

  const [filters, setFilters] = useState<IFilter[]>([]);

  useEffect(() => {
    getActiveBackdoors({
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
  }, [getActiveBackdoors]);

  const onFilters = (filters: IFilter[]) => {
    getActiveBackdoors({
      filters,
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
    setFilters(filters);
  };

  return (
    <>
      <Flex
        style={{ marginBottom: 16, width: "100%" }}
        gap={8}
        align="flex-end"
      >
        <div style={{ width: "100%" }}>
          <ActiveBackdoorFilters onFilters={onFilters} />
        </div>
      </Flex>

      <Space style={{ marginBottom: 32 }}>
        <CreateActiveBackdoor />

        <Button
          icon={<ReloadOutlined />}
          size="large"
          onClick={() => refreshActiveBackdoor()}
        >
          Сбросить неактивные
        </Button>
      </Space>

      <ActiveBackdoorTable
        data={data?.data}
        isLoading={isLoading || isFetching}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page, pageSize) => {
              pageSizeRef.current = pageSize;
              getActiveBackdoors({
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
