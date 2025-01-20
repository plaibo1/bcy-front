import { Flex, Space } from "antd";
import { OrdersTable } from "./OrdersTable";

import { OrdersCreateButton } from "./OrdersCreateButton";
import { useLazyGetOrdersQuery } from "../../store/api/orderApi";
import { useEffect, useRef, useState } from "react";
import { OrdersFilters } from "./OrdersFilters";

export const OrdersContainer = () => {
  const [getOrders, { data, isLoading }] = useLazyGetOrdersQuery();

  const pageSizeRef = useRef(10);

  const [filters, setFilters] = useState<IFilter[]>([]);

  useEffect(() => {
    getOrders({});
  }, [getOrders]);

  const onFilters = (filters: IFilter[]) => {
    getOrders({ filters });
    setFilters(filters);
  };

  return (
    <div>
      <Flex style={{ marginBottom: 32 }} gap={8} align="center">
        <OrdersCreateButton />
      </Flex>

      <Space style={{ marginBottom: 32 }}>
        <OrdersFilters onFilters={onFilters} />
      </Space>

      <OrdersTable
        data={data?.data}
        tableProps={{
          loading: isLoading,
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
