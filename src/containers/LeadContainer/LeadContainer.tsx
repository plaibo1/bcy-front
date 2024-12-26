import { useLazyGetBusinessObjectsQuery } from "../../store/api/businessObjectApi";
import { useLazyGetEntityFieldsQuery } from "../../store/api/entityFieldsApi";
import { LeadSelect } from "./LeadSelect";
import { createColumns } from "./createColumns";
import { LeadProvider } from "./LeadContext";
import { LeadTable } from "./LeadTable";
import { LeadAddFieldButton } from "./LeadAddField";
import { Flex } from "antd";
import { EditLeadEntity } from "./EditLeadEntity";
import { LeadFilters } from "./LeadFilters";
import { useState, useRef } from "react";
import { type TableRowSelection } from "antd/es/table/interface";

export const LeadContainer = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const pageSizeRef = useRef(10);

  const [getEntityFields, { data: entityFields, isError }] =
    useLazyGetEntityFieldsQuery();

  const [getBusinessObjects, { data: businessObjects, isLoading, isFetching }] =
    useLazyGetBusinessObjectsQuery();

  const handleSelect = async (entityId: string) => {
    await getEntityFields(entityId);
    await getBusinessObjects({ entityId });
  };

  const handleFilterChange = (filters: IFilter[]) => {
    if (entityFields && entityFields[0]?.entityId) {
      setFilters(filters);
      getBusinessObjects({ entityId: entityFields[0]?.entityId, filters });
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  return (
    <div>
      <Flex style={{ marginBottom: 32 }} gap={8} align="flex-end">
        <LeadSelect onChange={handleSelect} />

        {entityFields && !isError && entityFields[0]?.entityId && (
          <LeadAddFieldButton
            entityId={entityFields[0]?.entityId}
            onSubmit={() => getEntityFields(entityFields[0]?.entityId)}
          />
        )}

        {entityFields && !isError && entityFields[0]?.entityId && (
          <EditLeadEntity
            fields={entityFields}
            entityId={entityFields[0]?.entityId}
          />
        )}
      </Flex>

      <>
        {entityFields && !isError && entityFields && (
          <LeadFilters
            entityFields={entityFields}
            onFilters={handleFilterChange}
          />
        )}
      </>

      {entityFields && businessObjects && (
        <LeadProvider
          value={{
            leadsData: businessObjects?.data,
          }}
        >
          <LeadTable
            isLoading={isLoading || isFetching}
            columns={createColumns({ columnsFields: entityFields })}
            rowSelection={rowSelection}
            pagination={{
              onChange: (page, pageSize) => {
                pageSizeRef.current = pageSize;

                getBusinessObjects({
                  entityId: entityFields[0]?.entityId,
                  paging: { currentPage: page - 1, recordsOnPage: pageSize },
                  filters,
                });
              },
              pageSize: pageSizeRef.current,
              total: businessObjects?.paging.totalRecordsAmount || 1,
              current: businessObjects?.paging.currentPage + 1,
              showSizeChanger: true,
            }}
          />
        </LeadProvider>
      )}
    </div>
  );
};
