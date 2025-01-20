import { App, Button, Flex, Form, Input, InputNumber, Select } from "antd";
import { IOrder } from "../../../../types/api/ordersType";
import { ordersStatuses } from "../../../../consts";
import { isBackendError } from "../../../../types/errorTypeGuards";
import { useEditOrderMutation } from "../../../../store/api/orderApi";

export const OrdersEditForm = ({
  order,
  onCancel,
}: {
  order: IOrder;
  onCancel: () => void;
}) => {
  const { notification } = App.useApp();
  const [editOrder] = useEditOrderMutation();

  const onFinish = (values: IOrder) => {
    editOrder({ ...values, id: order.id })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Заказ успешно отредактирован",
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
          description: "Не удалось создать заказ",
        });
      });
  };

  return (
    <>
      <Form
        size="large"
        layout="vertical"
        initialValues={order}
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Название">
          <Input />
        </Form.Item>

        <Form.Item name="mailsForSend" label="Мэйлы">
          <Select mode="tags" />
        </Form.Item>

        <Form.Item name="status" label="Статус">
          <Select>
            {Object.keys(ordersStatuses).map((status) => (
              <Select.Option key={status}>
                {ordersStatuses[status].label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Flex justify="space-between">
          <Form.Item name="costPerLead" label="Стоимость за лид">
            <InputNumber />
          </Form.Item>

          <Form.Item name="maxDefect" label="Максимальный дефект">
            <InputNumber min={0} max={100} />
          </Form.Item>

          <Form.Item name="leadCount" label="Лидов">
            <InputNumber />
          </Form.Item>
        </Flex>

        <Flex justify="flex-end" gap={8}>
          <Button size="large" type="default" onClick={onCancel}>
            Отмена
          </Button>

          <Button size="large" type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Flex>
      </Form>
    </>
  );
};
