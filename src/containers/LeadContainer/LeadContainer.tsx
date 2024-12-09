import { useLazyGetBusinessObjectsQuery } from "../../store/api/businessObjectApi";
import { useLazyGetEntityFieldsQuery } from "../../store/api/entityFieldsApi";
import { LeadSelect } from "./LeadSelect";
import { createColumns } from "./createColumns";
import { LeadProvider } from "./LeadContext";
import { LeadTable } from "./LeadTable";
import { LeadAddFieldButton } from "./LeadAddField";
import { Space } from "antd";
import { EditLeadEntity } from "./EditLeadEntity";
import { LeadFilters } from "./LeadFilters";
import { useState } from "react";

export const LeadContainer = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);

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

  return (
    <div>
      <Space>
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
      </Space>

      <>
        {entityFields && !isError && entityFields && (
          <LeadFilters
            entityFields={entityFields}
            onFilters={handleFilterChange}
          />
        )}
      </>

      {entityFields && businessObjects && (
        <LeadProvider value={businessObjects?.data}>
          <LeadTable
            isLoading={isLoading || isFetching}
            columns={createColumns({ columnsFields: entityFields })}
            pagination={{
              onChange: (page) => {
                getBusinessObjects({
                  entityId: entityFields[0]?.entityId,
                  paging: { currentPage: page - 1 },
                  filters,
                });
              },
              pageSize: 10,
              total: businessObjects?.paging.totalRecordsAmount || 1,
              current: businessObjects?.paging.currentPage + 1,
            }}
          />
        </LeadProvider>
      )}
    </div>
  );
};
