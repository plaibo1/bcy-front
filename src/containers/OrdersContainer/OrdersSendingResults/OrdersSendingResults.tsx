import { Alert, App, Skeleton, Table } from "antd";
import { useLazyGetOrderSendingResultsQuery } from "../../../store/api/orderApi";
import { PageTotalCountTag } from "../../../components/PageTotalCountTag";
import { useLazyGetEntityFieldsQuery } from "../../../store/api/entityFieldsApi";
import { useEffect, useRef } from "react";
import { createColumns } from "../../LeadContainer/createColumns";
import { useParams } from "react-router";
import { isBackendError } from "../../../types/errorTypeGuards";
import { OrdersSendingResultsUpdate } from "./OrdersSendingResultsUpdate";

export const OrdersSendingResults = () => {
  const { notification } = App.useApp();
  const { orderId } = useParams<{ orderId: string }>();
  const pageSizeRef = useRef(50);

  const [getResults, { data, isLoading, isFetching }] =
    useLazyGetOrderSendingResultsQuery();

  const [
    getEntityFields,
    {
      data: entityFields,
      isLoading: isLoadingEntityFields,
      isError: isErrorEntityFields,
    },
  ] = useLazyGetEntityFieldsQuery();

  useEffect(() => {
    getResults({
      orderId: orderId || "",
      paging: { currentPage: 0, recordsOnPage: pageSizeRef.current },
    })
      .unwrap()
      .then((data) => {
        const entityId = data.data[0].entityId;

        getEntityFields(entityId).unwrap();
      })
      .catch((err) => {
        if (isBackendError(err)) {
          notification.error({
            message: "Ошибка",
            description: err.data.message,
          });
          return;
        }
        notification.error({
          message: "Ошибка",
          description: "Не удалось загрузить результаты",
        });
      });
  }, [getResults, getEntityFields, orderId, notification]);

  if (isLoading || isLoadingEntityFields) {
    return <Skeleton />;
  }

  if (isErrorEntityFields || !entityFields) {
    return (
      <Alert
        description="Ошибка при загрузке сущностей"
        message="Ошибка!"
        type="error"
      />
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <OrdersSendingResultsUpdate />
      </div>

      <PageTotalCountTag
        count={data?.paging.totalRecordsAmount}
        isLoading={isLoading || isFetching}
      />

      <Table
        loading={isLoading || isFetching}
        columns={createColumns({ columnsFields: entityFields || [] })}
        dataSource={data?.data || []}
        pagination={{
          onChange: (page, pageSize) => {
            pageSizeRef.current = pageSize;

            getResults({
              orderId: orderId || "",
              paging: { currentPage: page - 1, recordsOnPage: pageSize },
            });
          },
          pageSize: pageSizeRef.current,
          total: data?.paging.totalRecordsAmount || 1,
          current: (data?.paging.currentPage ?? 0) + 1,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};
