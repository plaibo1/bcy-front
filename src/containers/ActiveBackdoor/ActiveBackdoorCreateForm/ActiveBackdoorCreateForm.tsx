import { App, Button, Flex, Form, Input, Typography } from "antd";
import { IActiveBackdoorCreate } from "../../../types/api/activeBackdoorsTypes";
import { useCreateActiveBackdoorMutation } from "../../../store/api/activeBackdoorsApi";
import { SearchClient } from "../../../components/SearchClient";

export const ActiveBackdoorCreateForm = ({
  onCancel,
}: {
  onCancel: () => void;
}) => {
  const { notification } = App.useApp();
  const [createActiveBackdoor] = useCreateActiveBackdoorMutation();

  const onFinish = (values: IActiveBackdoorCreate) => {
    const res = Object.keys(values).reduce((acc, key) => {
      const value = values[key as keyof IActiveBackdoorCreate];

      if (Array.isArray(value)) {
        acc[key as keyof IActiveBackdoorCreate] = value[0];
        return acc;
      }

      acc[key as keyof IActiveBackdoorCreate] = value;
      return acc;
    }, {} as IActiveBackdoorCreate);

    createActiveBackdoor(res)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Бэкдор успешно создан",
        });
        onCancel();
      })
      .catch(() => {
        notification.error({
          message: "Ошибка",
          description: "Не удалось создать бэкдор",
        });
      });
  };

  return (
    <>
      <Typography.Title style={{ marginBottom: 32 }} level={3}>
        Active Backdoor
      </Typography.Title>

      <Form size="large" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="url"
          label="URL"
          validateTrigger="onSubmit"
          rules={[
            { required: true },
            { type: "url", message: "Некорректный URL" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          validateTrigger="onSubmit"
          name="clientId"
          label="Клиент"
          rules={[{ required: true }]}
        >
          <SearchClient />
        </Form.Item>

        <Flex gap={8} justify="flex-end">
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Flex>
      </Form>
    </>
  );
};
