import { Table } from "antd";
import { useLazyGetBusinessObjectsQuery } from "../../store/api/businessObjectApi";
import { useLazyGetEntityFieldsQuery } from "../../store/api/entityFieldsApi";
import { LeadSelect } from "./LeadSelect";
import { createColumns } from "./createColumns";

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
        <Table
          rowKey="id"
          loading={isLoading || isFetching}
          dataSource={businessObjects?.data}
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
      )}
    </div>
  );
};
