import { useEffect, useRef, useState } from "react";
import { useLazyGetLandingLeadsQuery } from "../../store/api/landingLeadsApi";
import { Flex } from "antd";
import { PageTotalCountTag } from "../../components/PageTotalCountTag";
import { LandingLeadsTable } from "./LandingLeadsTable";
import { LandingLeadsFilters } from "./LandingLeadsFilters";
import { LandingLeadsProvider } from "./LandingLeadsContext/LandingLeadsProvider";
import { LandingLeadsActions } from "./LeadsActions";

export const LandingLeadsContainer = () => {
  const [getLandingLeadsData, { data, isLoading, isFetching }] =
    useLazyGetLandingLeadsQuery();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);

  const pageSizeRef = useRef(50);

  useEffect(() => {
    getLandingLeadsData({
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
  }, [getLandingLeadsData]);

  const onFilters = (filters: IFilter[]) => {
    getLandingLeadsData({
      filters,
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
    setFilters(filters);
    setSelectedRowKeys([]);
  };

  return (
    <LandingLeadsProvider
      value={{
        selectedLandingLeads: selectedRowKeys,
        setSelectedLandingLeads: setSelectedRowKeys,
        filters,
      }}
    >
      <Flex style={{ marginBottom: 32 }} gap={8} align="flex-end">
        <LandingLeadsActions />
      </Flex>

      <PageTotalCountTag
        count={data?.paging.totalRecordsAmount}
        isLoading={isLoading || isFetching}
      />

      <div style={{ marginBottom: 32, width: "100%" }}>
        <LandingLeadsFilters onFilters={onFilters} />
      </div>

      <LandingLeadsTable
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        data={data?.data}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page, pageSize) => {
              pageSizeRef.current = pageSize;
              getLandingLeadsData({
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
    </LandingLeadsProvider>
  );
};
