import {
  App,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Switch,
} from "antd";
import { IEditProps } from "./EditButton";
import dayjs from "dayjs";
import { useUpdateBusinessObjectMutation } from "../../../store/api/businessObjectApi";
import { IBusinessObjectCreate } from "../../../types/api/businessObjectTypes";

const { TextArea } = Input;

interface IProps extends IEditProps {
  cancel: () => void;
}

export const EditForm = ({
  entityFields,
  boItem,
  cancel,
  entityId,
}: IProps) => {
  const { notification } = App.useApp();
  const [updateBusinessObject] = useUpdateBusinessObjectMutation();

  const [form] = Form.useForm();

  const { data } = boItem;

  const onFinish = (values: IBusinessObjectCreate) => {
    console.log(values);
    updateBusinessObject({
      entityId,
      id: boItem.id,
      ...values,
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Лид успешно обновлен",
        });
        cancel();
      })
      .catch((error) => {
        console.log("🚀 ~ onFinish ~ error:", error);
        if ("message" in error.data) {
          notification.error({
            message: "Ошибка",
            description: error.data.message,
          });
          return;
        }

        notification.error({
          message: "Ошибка",
          description: "Произошла ошибка при обновлении лид",
        });
      });
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      {entityFields.map((field) => {
        const value = data[field.name];

        if (field.readOnly) {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <Input disabled size="large" defaultValue={value as string} />
            </Form.Item>
          );
        }

        if (field.type === "DATE") {
          const date = dayjs(value as string);

          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <DatePicker
                defaultValue={date}
                size="large"
                format="DD.MM.YYYY"
              />
            </Form.Item>
          );
        }

        if (field.type === "DATETIME") {
          const date = dayjs(value as string);

          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <DatePicker
                showTime
                defaultValue={date}
                size="large"
                format="DD.MM.YYYY HH:mm:ss"
              />
            </Form.Item>
          );
        }

        if (field.type === "BOOLEAN") {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <Switch size="default" defaultChecked={value as boolean} />
            </Form.Item>
          );
        }

        if (field.type === "NUMBER") {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <InputNumber
                style={{ minWidth: 150, width: "fit-content" }}
                size="large"
                defaultValue={value as number}
              />
            </Form.Item>
          );
        }

        if (
          field.type === "STRING" &&
          value &&
          typeof value === "string" &&
          value.length > 100
        ) {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <TextArea size="large" defaultValue={value} />
            </Form.Item>
          );
        }

        return (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            <Input size="large" defaultValue={value as string} />
          </Form.Item>
        );
      })}

      <Flex justify="end" gap={16}>
        <Button size="large" type="default" onClick={cancel}>
          Отмена
        </Button>

        <Button size="large" type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Flex>
    </Form>
  );
};
