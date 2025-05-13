import { Flex, Space } from "antd";
import { OrdersTable } from "./OrdersTable";

import { OrdersCreateButton } from "./OrdersCreateButton";
import { useLazyGetOrdersQuery } from "../../store/api/orderApi";
import { useEffect, useRef, useState } from "react";
import { OrdersFilters } from "./OrdersFilters";
import { PageTotalCountTag } from "../../components/PageTotalCountTag";

const DEFAULT_FILTER: IFilter = {
  field: "status",
  operation: "equal",
  values: ["IN_PROGRESS"],
};

export const OrdersContainer = () => {
  const [getOrders, { data, isLoading, isFetching }] = useLazyGetOrdersQuery();

  const pageSizeRef = useRef(50);

  const [filters, setFilters] = useState<IFilter[]>([]);

  useEffect(() => {
    getOrders({
      filters: [DEFAULT_FILTER], // Из ТЗ по дефолту ищем так
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
  }, [getOrders]);

  const onFilters = (filters: IFilter[]) => {
    getOrders({
      filters,
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
    setFilters(filters);
  };

  return (
    <div>
      <Flex style={{ marginBottom: 32 }} gap={8} align="center">
        <OrdersCreateButton />
      </Flex>

      <PageTotalCountTag
        count={data?.paging.totalRecordsAmount}
        isLoading={isLoading || isFetching}
      />

      <Space style={{ marginBottom: 32 }}>
        <OrdersFilters onFilters={onFilters} />
      </Space>

      <OrdersTable
        data={data?.data}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page, pageSize) => {
              pageSizeRef.current = pageSize;
              getOrders({
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
    </div>
  );
};
