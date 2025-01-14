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
import { useContext } from "react";
import { LeadContext } from "../LeadContext";
import { SelectField } from "../LeadFilters/SelectField";

const { TextArea } = Input;

interface IProps extends IEditProps {
  cancel: () => void;
  index: number;
}

export const EditForm = ({
  boItem,
  cancel,
  entityId,
  index,
  entityFields,
}: IProps) => {
  const { notification } = App.useApp();
  const { setLeads } = useContext(LeadContext); // TODO: useContext

  const [updateBusinessObject] = useUpdateBusinessObjectMutation();

  const [form] = Form.useForm();

  const { data } = boItem;

  const onFinish = (values: Record<string, unknown>) => {
    const res = Object.keys(values).reduce<Record<string, unknown>>(
      (acc, key) => {
        const foundField = entityFields.find((f) => f.name === key);

        if (foundField!.type === "DATE") {
          acc[key] = dayjs(values[key] as string).format("YYYY-MM-DD");
          return acc;
        }

        if (foundField!.type === "DATETIME") {
          acc[key] = dayjs(values[key] as string).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          );
          return acc;
        }

        acc[key] = values[key];
        return acc;
      },
      {}
    );

    updateBusinessObject({
      entityId,
      id: boItem.id,
      data: res,
    })
      .unwrap()
      .then((res) => {
        setLeads((prev) => {
          const newLeads = [...prev];
          newLeads[index] = { ...newLeads[index], ...res };
          return newLeads;
        });

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

        if (field.settings?.labelValues) {
          return <SelectField field={field} initialValue={value as string} />;
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
