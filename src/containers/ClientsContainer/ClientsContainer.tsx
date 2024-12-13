import { ClientsTable } from "./ClientsTable/ClientsTable";
import { useLazyGetClientsQuery } from "../../store/api/clientsApi";
import { useEffect } from "react";
import { ClientCreateButton } from "./ClientCreateButton";
import { Flex } from "antd";

export const ClientsContainer = () => {
  const [getClients, { data, isLoading, isFetching }] =
    useLazyGetClientsQuery();

  useEffect(() => {
    getClients({});
  }, [getClients]);

  return (
    <div>
      <Flex gap={8} align="flex-end" style={{ marginBottom: 32 }}>
        <ClientCreateButton />
      </Flex>

      <ClientsTable
        data={data?.data || []}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page) => {
              getClients({
                paging: { currentPage: page - 1 },
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
