import { IEntityUpdate } from "../../../types/api/entityFieldsTypes";
import { App, Button, Form, Input, Switch, theme } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useUpdateEntityFieldMutation } from "../../../store/api/entityFieldsApi";

const { TextArea } = Input;

const formFields: Record<
  keyof IEntityUpdate,
  { label: string; type: "string" | "boolean" | "text"; required?: boolean }
> = {
  label: { label: "Имя в таблице", type: "string", required: true },
  description: { label: "Описание поля", type: "text" },
  system: { label: "Системное", type: "boolean" },
  hiddenFromUser: { label: "Скрыто для пользователя", type: "boolean" },
  hiddenFromUi: { label: "Скрыто в интерфейсе", type: "boolean" },
  archived: { label: "Архив", type: "boolean" },
  readOnly: { label: "Только для чтения", type: "boolean" },
  required: { label: "Обязательное", type: "boolean" },
};

export const EditLeadEntityForm = ({
  initialValues,
  entityId,
  filedId,
}: {
  initialValues: IEntityUpdate;
  entityId: string;
  filedId: string;
}) => {
  const { message } = App.useApp();
  const {
    token: { borderRadiusLG, colorBorder },
  } = theme.useToken();

  const [updateEntityField] = useUpdateEntityFieldMutation();

  const onFinish = (values: IEntityUpdate) => {
    updateEntityField({ entityId, filedId, ...values })
      .unwrap()
      .then(() => {
        message.success("Поле успешно обновлено");
      })
      .catch(() => {
        message.error("Ошибка при обновлении поля");
      });
  };

  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onFinish}>
      {Object.keys(formFields)
        .filter(
          (key) => formFields[key as keyof IEntityUpdate].type !== "boolean"
        )
        .map((key) => {
          const { label, type, required } =
            formFields[key as keyof IEntityUpdate];

          return (
            <Form.Item
              label={label}
              name={key}
              rules={required ? [{ required: true }] : []}
            >
              {type === "text" ? <TextArea /> : <Input />}
            </Form.Item>
          );
        })}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
        }}
      >
        {Object.keys(formFields)
          .filter(
            (key) => formFields[key as keyof IEntityUpdate].type === "boolean"
          )
          .map((key) => {
            const { label } = formFields[key as keyof IEntityUpdate];
            return (
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
            );
          })}
      </div>

      <Button
        style={{ marginTop: 16 }}
        type="primary"
        htmlType="submit"
        icon={<SaveOutlined />}
      >
        Сохранить
      </Button>
    </Form>
  );
};
