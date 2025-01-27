import {
  App,
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import { ordersStatuses } from "../../../../consts";
import { LeadSelect } from "../../../LeadContainer/LeadSelect";
import { useState } from "react";
import { type IOrderCreate } from "../../../../types/api/ordersType";
import { useCreateOrderMutation } from "../../../../store/api/orderApi";
import { isBackendError } from "../../../../types/errorTypeGuards";
import { SearchClient } from "../../../../components/SearchClient";

export const OrdersCreateForm = ({ onCancel }: { onCancel: () => void }) => {
  const { message, notification } = App.useApp();
  const [entityId, setEntityId] = useState<string | undefined>();

  const [createOrder] = useCreateOrderMutation();

  const onFinish = (values: IOrderCreate) => {
    if (!entityId) {
      message.error("Выберите категорию");
      return;
    }

    const res = { ...values, categoryId: entityId };

    if (Array.isArray(res.clientId)) {
      res.clientId = res.clientId[0];
    }

    createOrder(res)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Заказ успешно создан",
        });
        onCancel();
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
          description: "Произошла ошибка при создании заказа",
        });
      });

    console.log("Success:", res);
  };

  return (
    <>
      <Typography.Title style={{ marginBottom: 12 }} level={3}>
        Создать заказ
      </Typography.Title>

      <Form size="large" layout="vertical" onFinish={onFinish}>
        <Form.Item label="Категория">
          <LeadSelect onChange={setEntityId} />
        </Form.Item>

        <Form.Item label="Клиент" name="clientId" rules={[{ required: true }]}>
          <SearchClient />
        </Form.Item>

        <Form.Item name="name" label="Название" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="mailsForSend"
          label="Мэйлы"
          rules={[{ required: true }]}
        >
          <Select mode="tags" />
        </Form.Item>

        <Form.Item name="status" label="Статус" rules={[{ required: true }]}>
          <Select>
            {Object.keys(ordersStatuses).map((status) => (
              <Select.Option key={status}>
                {ordersStatuses[status].label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Flex justify="space-between">
          <Form.Item
            name="costPerLead"
            label="Стоимость за лид"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            name="leadCount"
            label="Лидов"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Flex>

        <Form.Item
          name="maxDefect"
          label="Максимальный дефект"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>

        <Flex justify="flex-end" gap={8}>
          <Button size="large" type="default" onClick={onCancel}>
            Отмена
          </Button>

          <Button size="large" type="primary" htmlType="submit">
            Создать заказ
          </Button>
        </Flex>
      </Form>
    </>
  );
};
