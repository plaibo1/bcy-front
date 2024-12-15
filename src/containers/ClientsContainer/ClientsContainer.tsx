import { ClientsTable } from "./ClientsTable/ClientsTable";
import { useLazyGetClientsQuery } from "../../store/api/clientsApi";
import { useEffect, useState } from "react";
import { ClientCreateButton } from "./ClientCreateButton";
import { Flex } from "antd";
import { ClientsFilters } from "./ClientsFilters";

export const ClientsContainer = () => {
  const [getClients, { data, isLoading, isFetching }] =
    useLazyGetClientsQuery();

  const [filters, setFilters] = useState<IFilter[]>([]);

  useEffect(() => {
    getClients({});
  }, [getClients]);

  const handleFilterChange = (filters: IFilter[]) => {
    setFilters(filters);
    getClients({ filters });
  };

  return (
    <div>
      <Flex gap={8} align="flex-end" style={{ marginBottom: 32 }}>
        <ClientCreateButton />
      </Flex>

      <ClientsFilters onFilters={handleFilterChange} />

      <ClientsTable
        data={data?.data || []}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page) => {
              getClients({
                paging: { currentPage: page - 1 },
                filters,
              });
            },
            current: (data?.paging.currentPage ?? 0) + 1,
            total: data?.paging.totalRecordsAmount || 1,
            pageSize: 10,
          },
        }}
      />
    </div>
  );
};
