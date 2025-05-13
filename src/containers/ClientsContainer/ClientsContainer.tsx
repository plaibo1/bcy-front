import { ClientsTable } from "./ClientsTable/ClientsTable";
import { useLazyGetClientsQuery } from "../../store/api/clientsApi";
import { useEffect, useRef, useState } from "react";
import { ClientCreateButton } from "./ClientCreateButton";
import { Flex, Space } from "antd";
import { ClientsFilters } from "./ClientsFilters";
import { PageTotalCountTag } from "../../components/PageTotalCountTag";

export const ClientsContainer = () => {
  const [getClients, { data, isLoading, isFetching }] =
    useLazyGetClientsQuery();

  const [filters, setFilters] = useState<IFilter[]>([]);

  const pageSizeRef = useRef(50);

  useEffect(() => {
    getClients({
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
  }, [getClients]);

  const handleFilterChange = (filters: IFilter[]) => {
    getClients({
      filters,
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });

    setFilters(filters);
  };

  return (
    <div>
      <Flex gap={8} align="flex-end" style={{ marginBottom: 32 }}>
        <ClientCreateButton />
      </Flex>

      <PageTotalCountTag
        count={data?.paging.totalRecordsAmount}
        isLoading={isLoading || isFetching}
      />

      <Space style={{ marginBottom: 32 }}>
        <ClientsFilters onFilters={handleFilterChange} />
      </Space>

      <ClientsTable
        data={data?.data}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page, pageSize) => {
              pageSizeRef.current = pageSize;

              getClients({
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
