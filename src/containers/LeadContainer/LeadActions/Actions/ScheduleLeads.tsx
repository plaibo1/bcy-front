import {
  Alert,
  App,
  Button,
  DatePicker,
  Flex,
  Form,
  InputNumber,
  Space,
} from "antd";
import { SearchOrders } from "../../../../components/SearchOrders";
import {
  useScheduleLeadsMutation,
  useScheduleLeadsWithDurationMutation,
} from "../../../../store/api/leadActionsApi";
import { useContext } from "react";
import { LeadContext } from "../../LeadContext";
import dayjs from "dayjs";
import { isBackendError } from "../../../../types/errorTypeGuards";

export const ScheduleLeads = ({ onCancel }: { onCancel?: () => void }) => {
  const { message, notification } = App.useApp();
  const { selectedLeads, entityId } = useContext(LeadContext);
  const [scheduleLeads, { isLoading }] = useScheduleLeadsMutation();
  const [scheduleLeadsWithDuration, { isLoading: isLoading2 }] =
    useScheduleLeadsWithDurationMutation();

  // TODO: fix startDate type

  const onFinish = ({
    orderId,
    startDate,
    durationInMinutes,
  }: {
    orderId: string[];
    startDate?: string;
    durationInMinutes?: number;
  }) => {
    if (!entityId) {
      message.error("Выберите сущность");
      return;
    }

    if (selectedLeads.length === 0) {
      message.error("Выберите лиды");
      return;
    }

    if (typeof durationInMinutes === "undefined" && !startDate) {
      scheduleLeads({
        entityId,
        orderId: orderId[0],
        leadIds: selectedLeads.map((item) => String(item)),
        startDate: null,
      })
        .unwrap()
        .then(() => {
          notification.success({
            message: "Успешно",
            description: "Лиды успешно запланированы",
          });
          onCancel?.();
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
            description: "Произошла ошибка при запланировани лидов",
          });
        });

      return;
    }

    if (!startDate || !durationInMinutes) {
      message.error("Выберите дату и длительность");
      return;
    }

    scheduleLeadsWithDuration({
      entityId,
      orderId: orderId[0],
      leadIds: selectedLeads.map((item) => String(item)),
      startDate: startDate
        ? dayjs(startDate).format("YYYY-MM-DDTHH:mm:ssZ")
        : null,
      durationInMinutes,
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Лиды успешно запланированы",
        });
        onCancel?.();
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
          description: "Произошла ошибка при запланировани лидов",
        });
      });
  };

  return (
    <>
      {selectedLeads.length === 0 && (
        <Alert
          showIcon
          message="Выберите лиды"
          type="warning"
          style={{ marginBottom: 16 }}
        />
      )}

      <Form size="large" layout="vertical" onFinish={onFinish}>
        <Form.Item label="Заказ" name="orderId" rules={[{ required: true }]}>
          <SearchOrders
            searchFilters={[
              {
                field: "status",
                operation: "not equal",
                values: ["EXECUTED"],
              },
            ]}
          />
        </Form.Item>

        <Space>
          <Form.Item label="Дата" name="startDate">
            <DatePicker showTime format="DD.MM.YYYY HH:mm" />
          </Form.Item>

          <Form.Item
            label="Длительность (мин)"
            name="durationInMinutes"
            rules={[{ type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: 200 }} min={0} />
          </Form.Item>
        </Space>

        <Flex justify="flex-end">
          <Button
            type="primary"
            htmlType="submit"
            disabled={selectedLeads.length === 0}
            loading={isLoading || isLoading2}
          >
            Запланировать
          </Button>
        </Flex>
      </Form>
    </>
  );
};
