import {
  App,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Switch,
  theme,
  Typography,
} from "antd";
import { IEntityCreate } from "../../../types/api/entityTypes";
import { type Rule } from "antd/es/form";
import { useCreateEntityMutation } from "../../../store/api/entityApi";
import { isBackendError } from "../../../types/errorTypeGuards";

type Fields = Record<
  keyof IEntityCreate,
  { label: string; rules?: Rule[]; type?: "boolean" | string }
>;

const fields: Partial<Fields> = {
  name: { label: "Системное имя", rules: [{ required: true }] },
  label: { label: "Отображаемое имя", rules: [{ required: true }] },
  description: { label: "Описание", rules: [{ required: true }] },
  system: { label: "Системная", type: "boolean" },
};

export const ModalContent = ({ onClose }: { onClose: () => void }) => {
  const { notification } = App.useApp();

  const [createEntity] = useCreateEntityMutation();

  const {
    token: { colorBorder, borderRadiusLG },
  } = theme.useToken();

  const onFinish = (values: IEntityCreate) => {
    createEntity(values)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Сущность успешно создана",
          description: "Сущность успешно создана",
        });
        onClose();
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
          description: "Произошла ошибка при создании сущности",
        });
      });
  };

  return (
    <>
      <Typography.Title style={{ marginBottom: 32 }} level={3}>
        Добавление сущности
      </Typography.Title>

      <Form size="large" layout="vertical" onFinish={onFinish}>
        {Object.entries(fields)
          .filter(([key]) => fields[key as keyof Fields]?.type !== "boolean")
          .map(([key, { label, rules }]) => (
            <Form.Item key={key} label={label} name={key} rules={rules}>
              <Input />
            </Form.Item>
          ))}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          {Object.entries(fields)
            .filter(([key]) => fields[key as keyof Fields]?.type === "boolean")
            .map(([key, { label }]) => (
              <div
                key={key}
                style={{
                  border: `1px solid ${colorBorder}`,
                  borderRadius: borderRadiusLG,
                  padding: 12,
                  paddingBottom: 0,
                }}
              >
                <Form.Item label={label} name={key} valuePropName="checked">
                  <Switch />
                </Form.Item>
              </div>
            ))}
        </div>

        <Divider />

        <Flex justify="flex-end" gap={16}>
          <Button htmlType="button" onClick={onClose}>
            Отмена
          </Button>

          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Flex>
      </Form>
    </>
  );
};
