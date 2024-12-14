import { App, Button, Flex, Form, Input, Typography } from "antd";
import { IClient } from "../../../types/api/clientsType";
import { Rule } from "antd/es/form";
import { useCreateClientMutation } from "../../../store/api/clientsApi";

const formItems: Record<
  keyof Omit<IClient, "id" | "orders">,
  { label: string; filedName: string; rules: Rule[] }
> = {
  firstName: {
    label: "Имя",
    filedName: "firstName",
    rules: [{ required: true, message: "Пожалуйста, введите имя" }],
  },
  lastName: {
    label: "Фамилия",
    filedName: "lastName",
    rules: [{ required: true, message: "Пожалуйста, введите фамилию" }],
  },
  middleName: {
    label: "Отчество",
    filedName: "middleName",
    rules: [{ required: true, message: "Пожалуйста, введите отчество" }],
  },
  email: {
    label: "Email",
    filedName: "email",
    rules: [{ required: true, message: "Пожалуйста, введите email" }],
  },
  comment: { label: "Комментарий", filedName: "comment", rules: [] },
};

export const ClientCreateForm = ({ onClose }: { onClose: () => void }) => {
  const { notification } = App.useApp();
  const [form] = Form.useForm();

  const [createClient] = useCreateClientMutation();

  const onFinish = (values: Omit<IClient, "id" | "orders">) => {
    createClient(values)
      .then(() => {
        form.resetFields();
        onClose();

        notification.success({
          message: "Успешно",
          description: (
            <>
              Клиент{" "}
              <b>
                {values.firstName} {values.lastName}
              </b>{" "}
              успешно создан
            </>
          ),
        });
      })
      .catch(() => {
        notification.error({
          message: "Ошибка",
          description: "При создании клиента произошла ошибка",
        });
      });
  };

  const onReset = () => {
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Typography.Title style={{ marginBottom: 32 }} level={3}>
        Создание клиента
      </Typography.Title>

      <Form form={form} onFinish={onFinish}>
        {Object.entries(formItems).map(([key, { label, filedName, rules }]) => (
          <Form.Item key={key} label={label} name={filedName} rules={rules}>
            <Input />
          </Form.Item>
        ))}

        <Flex justify="flex-end" gap={8}>
          <Button type="default" htmlType="button" onClick={onReset}>
            Отменить
          </Button>

          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Flex>
      </Form>
    </>
  );
};
