import { useLazyGetBusinessObjectsQuery } from "../../store/api/businessObjectApi";
import { useLazyGetEntityFieldsQuery } from "../../store/api/entityFieldsApi";
import { LeadSelect } from "./LeadSelect";
import { createColumns } from "./createColumns";
import { LeadProvider } from "./LeadContext";
import { LeadTable } from "./LeadTable";
import { LeadAddFieldButton } from "./LeadAddField";
import { Divider, Flex } from "antd";
import { EditLeadEntity } from "./EditLeadEntity";
import { LeadFilters } from "./LeadFilters";
import { useState, useRef } from "react";
import { type TableRowSelection } from "antd/es/table/interface";
import { AddLeadButton } from "./AddLeadButton";
import { AddBusinessObject } from "./AddBusinessObject";
import { LeadActionsButton } from "./LeadActions";
import { AnyObject } from "antd/es/_util/type";

export const LeadContainer = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const currentEntityId = useRef<string>();
  const pageSizeRef = useRef(10);

  const [getEntityFields, { data: entityFields, isError }] =
    useLazyGetEntityFieldsQuery();

  const [getBusinessObjects, { data: businessObjects, isLoading, isFetching }] =
    useLazyGetBusinessObjectsQuery();

  const handleSelect = async (entityId: string) => {
    await getEntityFields(entityId);
    await getBusinessObjects({ entityId });

    currentEntityId.current = entityId;
    setSelectedRowKeys([]);
  };

  const handleFilterChange = (filters: IFilter[]) => {
    if (currentEntityId.current) {
      setFilters(filters);
      getBusinessObjects({ entityId: currentEntityId.current, filters });
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  const handleRowClick = (record: AnyObject, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedRowKeys((prev) => {
        const alreadySelected = prev.includes(record.id);
        return alreadySelected
          ? prev.filter((id) => id !== record.id)
          : [...prev, record.id];
      });
    }
  };

  return (
    <div>
      <Flex style={{ marginBottom: 32 }} gap={8} align="center">
        <AddLeadButton />
        <LeadSelect selectFirst onChange={handleSelect} />

        {entityFields && !isError && currentEntityId.current && (
          <LeadAddFieldButton
            entityId={currentEntityId.current}
            onSubmit={() => getEntityFields(currentEntityId.current || "")}
          />
        )}

        {entityFields && !isError && currentEntityId.current && (
          <EditLeadEntity
            fields={entityFields}
            entityId={currentEntityId.current}
          />
        )}

        <Divider type="vertical" />

        {entityFields && !isError && currentEntityId.current && (
          <AddBusinessObject
            entityId={currentEntityId.current}
            onSubmit={() => {
              console.log("onSubmit dasdas");
              getEntityFields(currentEntityId.current || "");
            }}
            entityFields={entityFields}
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
            selectedLeads: selectedRowKeys,
            entityId: currentEntityId.current,
            filters,
          }}
        >
          <Flex style={{ marginBottom: 24 }}>
            <LeadActionsButton />
          </Flex>

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
            onRow={(record) => ({
              onClick: (event) => handleRowClick(record, event),
            })}
          />
        </LeadProvider>
      )}
    </div>
  );
};
