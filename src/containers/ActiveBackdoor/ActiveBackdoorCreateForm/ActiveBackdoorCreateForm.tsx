import { App, Button, Flex, Form, Input, Typography } from "antd";
import { IActiveBackdoorCreate } from "../../../types/api/activeBackdoorsTypes";
import { useCreateActiveBackdoorMutation } from "../../../store/api/activeBackdoorsApi";
import { SearchClient } from "../../../components/SearchClient";
import { isBackendError } from "../../../types/errorTypeGuards";

export const ActiveBackdoorCreateForm = ({
  onCancel,
}: {
  onCancel: () => void;
}) => {
  const { notification } = App.useApp();
  const [createActiveBackdoor, { isLoading }] =
    useCreateActiveBackdoorMutation();

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
          description: "Интеграция успешно создана",
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
          description: "Не удалось создать интеграцию",
        });
      });
  };

  return (
    <>
      <Typography.Title style={{ marginBottom: 32 }} level={3}>
        Создать интеграцию
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
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Создать
          </Button>
        </Flex>
      </Form>
    </>
  );
};
