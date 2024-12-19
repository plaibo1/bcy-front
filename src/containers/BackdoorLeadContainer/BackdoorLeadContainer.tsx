import { Space } from "antd";
import { useLazyGetBackdoorLeadsQuery } from "../../store/api/backdoorLeadApi";
import { BackdoorLeadTable } from "./BackdoorLeadTable";
import { useEffect, useState } from "react";
import { BackdoorLeadFilters } from "./BackdoorLeadFilters";

export const BackdoorLeadContainer = () => {
  const [getBackdoorLeads, { data, isLoading, isFetching }] =
    useLazyGetBackdoorLeadsQuery();

  const [filters, setFilters] = useState<IFilter[]>([]);

  useEffect(() => {
    getBackdoorLeads({});
  }, [getBackdoorLeads]);

  const onFilters = (filters: IFilter[]) => {
    getBackdoorLeads({ filters });
    setFilters(filters);
  };

  return (
    <>
      <Space style={{ marginBottom: 32 }}>
        <BackdoorLeadFilters onFilters={onFilters} />
      </Space>

      <BackdoorLeadTable
        data={data?.data}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page, pageSize) => {
              getBackdoorLeads({
                paging: { currentPage: page - 1, recordsOnPage: pageSize },
                filters,
              });
            },
            current: (data?.paging.currentPage ?? 0) + 1,
            total: data?.paging.totalRecordsAmount || 1,
            pageSize: data?.paging.recordsOnPage || 10,
          },
        }}
      />
    </>
  );
};
