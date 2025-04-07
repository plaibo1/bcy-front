import { useEffect, useRef, useState } from "react";
import { IVRProvider } from "./IVRContext/IVRProvider";
import { IVRTable } from "./IVRTable/IVRTable";
import { PageTotalCountTag } from "../../components/PageTotalCountTag";
import { Flex, Space } from "antd";
import { IVRFilters } from "./IVRFilters/IVRFilters";
import { useLazyGetIvrQuery } from "../../store/api/ivrApi";
import { IVRActions } from "./IVRActions";

export const IVRContainer = () => {
  const [getIvrData, { data, isLoading, isFetching }] = useLazyGetIvrQuery();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);

  const pageSizeRef = useRef(50);

  useEffect(() => {
    getIvrData({
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
  }, [getIvrData]);

  const onFilters = (filters: IFilter[]) => {
    getIvrData({
      filters,
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    });
    setFilters(filters);
    setSelectedRowKeys([]);
  };

  return (
    <IVRProvider
      value={{
        selectedIVRs: selectedRowKeys,
        setSelectedIVRs: setSelectedRowKeys,
        filters,
      }}
    >
      <Flex style={{ marginBottom: 32 }} gap={8} align="flex-end">
        <IVRActions />
      </Flex>

      <PageTotalCountTag
        count={data?.paging.totalRecordsAmount}
        isLoading={isLoading || isFetching}
      />

      <Space style={{ marginBottom: 32 }}>
        <IVRFilters onFilters={onFilters} />
      </Space>

      <IVRTable
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        data={data?.data}
        tableProps={{
          loading: isLoading || isFetching,
          pagination: {
            onChange: (page, pageSize) => {
              pageSizeRef.current = pageSize;
              getIvrData({
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
    </IVRProvider>
  );
};
