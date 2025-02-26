import { Flex, Space } from "antd";
import { useLazyGetBackdoorLeadsQuery } from "../../store/api/backdoorLeadApi";
import { BackdoorLeadTable } from "./BackdoorLeadTable";
import { useEffect, useRef, useState } from "react";
import { BackdoorLeadFilters } from "./BackdoorLeadFilters";
import { BackdoorLeadOperations } from "./BackdoorLeadOperations";
import { BackdoorLeadProvider } from "./BackdoorLeadContext/BackdoorLeadProvider";

export const BackdoorLeadContainer = () => {
  const [getBackdoorLeads, { data, isLoading, isFetching }] =
    useLazyGetBackdoorLeadsQuery();

  const pageSizeRef = useRef(10);

  const [filters, setFilters] = useState<IFilter[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    getBackdoorLeads({});
  }, [getBackdoorLeads]);

  const onFilters = (filters: IFilter[]) => {
    getBackdoorLeads({ filters });
    setFilters(filters);
  };

  return (
    <>
      <Flex style={{ marginBottom: 32 }} gap={8} align="flex-end">
        <BackdoorLeadOperations
          disabled={!selectedRowKeys.length}
          selectedRowKeys={selectedRowKeys}
        />
      </Flex>

      <Space style={{ marginBottom: 32 }}>
        <BackdoorLeadFilters onFilters={onFilters} />
      </Space>

      <BackdoorLeadProvider
        value={{ selectedBackdoorLeads: selectedRowKeys, filters }}
      >
        <BackdoorLeadTable
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          data={data?.data}
          tableProps={{
            loading: isLoading || isFetching,
            pagination: {
              onChange: (page, pageSize) => {
                pageSizeRef.current = pageSize;
                getBackdoorLeads({
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
      </BackdoorLeadProvider>
    </>
  );
};
