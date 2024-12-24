import {
  App,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import {
  useDeleteClientMutation,
  useUpdateClientMutation,
} from "../../../store/api/clientsApi";
import { type IClient } from "../../../types/api/clientsType";
import { DeleteOutlined } from "@ant-design/icons";

const fields: Partial<Record<keyof IClient, string>> = {
  firstName: "Имя",
  lastName: "Фамилия",
  middleName: "Отчество",
  email: "Email",
  comment: "Комментарий",
};

const DeleteClientButton = ({ id }: { id: string }) => {
  const { notification } = App.useApp();
  const [deleteClient] = useDeleteClientMutation();

  const handleDelete = () => {
    deleteClient(id)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Клиент успешно удален",
        });
      })
      .catch(() => {
        notification.error({
          message: "Ошибка",
          description: "При удалении клиента произошла ошибка",
        });
      });
  };

  return (
    <Popconfirm
      title="Удалить клиента"
      description="Вы уверены, что хотите удалить этого клиента?"
      onConfirm={handleDelete}
      okText="Да"
      cancelText="Нет"
    >
      <Button danger type="default" icon={<DeleteOutlined />}>
        Удалить клиента
      </Button>
    </Popconfirm>
  );
};

export const ClientsEditForm = ({
  client,
  onClose,
}: {
  client: IClient;
  onClose: () => void;
}) => {
  const { notification } = App.useApp();
  const [updateClient] = useUpdateClientMutation();

  const onFinish = (values: IClient) => {
    updateClient({ ...values, id: client.id })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: (
            <>
              Клиент{" "}
              <b>
                {values.firstName} {values.lastName}
              </b>{" "}
              успешно обновлен
            </>
          ),
        });
      })
      .catch(() => {
        notification.error({
          message: "Ошибка",
          description: "При обновлении клиента произошла ошибка",
        });
      });
  };

  return (
    <>
      <Typography.Title style={{ marginBottom: 32 }} level={3}>
        Редактирование клиента
      </Typography.Title>

      <Form onFinish={onFinish} initialValues={client}>
        {Object.entries(fields).map(([field, label]) => (
          <Form.Item key={field} label={label} name={field}>
            <Input />
          </Form.Item>
        ))}

        <Divider />

        <Flex justify="space-between">
          <DeleteClientButton id={client.id} />

          <Space>
            <Button onClick={onClose}>Отмена</Button>

            <Button type="primary" htmlType="submit">
              Обновить
            </Button>
          </Space>
        </Flex>
      </Form>
    </>
  );
};
