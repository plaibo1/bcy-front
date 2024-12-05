import { useLazyGetBusinessObjectsQuery } from "../../store/api/businessObjectApi";
import { useLazyGetEntityFieldsQuery } from "../../store/api/entityFieldsApi";
import { LeadSelect } from "./LeadSelect";
import { createColumns } from "./createColumns";
import { LeadProvider } from "./LeadContext";
import { LeadTable } from "./LeadTable";

export const LeadContainer = () => {
  const [getEntityFields, { data: entityFields }] =
    useLazyGetEntityFieldsQuery();

  const [getBusinessObjects, { data: businessObjects, isLoading, isFetching }] =
    useLazyGetBusinessObjectsQuery();

  const handleSelect = async (entityId: string) => {
    await getEntityFields(entityId);
    await getBusinessObjects({ entityId });
  };

  return (
    <div>
      <LeadSelect onChange={handleSelect} />

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
