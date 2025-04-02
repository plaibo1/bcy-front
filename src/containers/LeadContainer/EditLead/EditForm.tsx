import {
  App,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Switch,
} from "antd";
import { IEditProps } from "./EditButton";
import dayjs from "dayjs";
import {
  useDeleteBusinessObjectMutation,
  useUpdateBusinessObjectMutation,
} from "../../../store/api/businessObjectApi";
import { useContext } from "react";
import { LeadContext } from "../LeadContext";
import { SelectField } from "../LeadFilters/SelectField";
import { PhoneInput } from "../../../components/PhoneInput";
import { type IEntityField } from "../../../types/api/entityFieldsTypes";

const { TextArea } = Input;

interface IProps extends IEditProps {
  cancel: () => void;
  index: number;
}

const transformDataToInitialValues = (
  data: Record<string, unknown>,
  entityFields: IEntityField[]
) => {
  return entityFields.reduce<Record<string, unknown>>((acc, field) => {
    const value = data[field.name];

    if (typeof value === "undefined") {
      return acc;
    }

    if (field.type === "DATE") {
      acc[field.name] = dayjs(value as string, "YYYY-MM-DD");
      return acc;
    }

    if (field.type === "DATETIME") {
      acc[field.name] = dayjs(value as string, "YYYY-MM-DDTHH:mm:ssZ");
      return acc;
    }

    acc[field.name] = data[field.name];
    return acc;
  }, {});
};

/**
 * @deprecated переписать на BusinessObjectForm
 */
export const EditForm = ({
  boItem,
  cancel,
  entityId,
  index,
  entityFields,
  name,
}: IProps) => {
  const { notification } = App.useApp();
  const { setLeads } = useContext(LeadContext); // TODO: useContext

  const [updateBusinessObject, { isLoading: isUpdating }] =
    useUpdateBusinessObjectMutation();
  const [deleteBusinessObject, { isLoading: isDeleting }] =
    useDeleteBusinessObjectMutation();

  const [form] = Form.useForm();

  const { data } = boItem;

  const onFinish = (values: Record<string, unknown>) => {
    const res = Object.keys(values).reduce<Record<string, unknown>>(
      (acc, key) => {
        if (key === "name") {
          acc[key] = values[key];
          return acc;
        }

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
      name: res.name as string,
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

  const handleDeleteLead = () => {
    deleteBusinessObject({ entityId, id: boItem.id })
      .unwrap()
      .then(() => {
        setLeads((prev) => prev.filter((lead) => lead.id !== boItem.id));

        notification.success({
          message: "Успешно",
          description: `Лид ${boItem.name} успешно удален`,
        });

        cancel();
      })
      .catch(() => {
        notification.error({
          message: "Ошибка",
          description: "Произошла ошибка при удалении лид",
        });
      });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{
        ...transformDataToInitialValues(data, entityFields),
        name,
      }}
    >
      <Form.Item label="Имя" name="name">
        <Input size="large" />
      </Form.Item>

      {entityFields.map((field) => {
        const value = data[field.name];

        if (field.readOnly) {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <Input disabled size="large" />
            </Form.Item>
          );
        }

        if (field.settings?.labelValues) {
          return <SelectField key={field.name} field={field} />;
        }

        if (field.type === "DATE") {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <DatePicker size="large" format="DD.MM.YYYY" />
            </Form.Item>
          );
        }

        if (field.type === "DATETIME") {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <DatePicker showTime size="large" format="DD.MM.YYYY HH:mm:ss" />
            </Form.Item>
          );
        }

        if (field.type === "BOOLEAN") {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <Switch size="default" />
            </Form.Item>
          );
        }

        if (field.type === "NUMBER") {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <InputNumber
                style={{ minWidth: 150, width: "fit-content" }}
                size="large"
              />
            </Form.Item>
          );
        }

        if (field.type === "PHONE") {
          return (
            <Form.Item key={field.name} label={field.label} name={field.name}>
              <PhoneInput
                style={{ minWidth: 150, width: "fit-content" }}
                size="large"
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
              <TextArea size="large" />
            </Form.Item>
          );
        }

        return (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            <Input size="large" />
          </Form.Item>
        );
      })}

      <Flex justify="space-between" gap={16}>
        <Popconfirm
          onConfirm={handleDeleteLead}
          title="Удалить лид"
          description="Вы уверены, что хотите удалить этот лид?"
          okText="Да"
          cancelText="Нет"
        >
          <Button
            loading={isDeleting}
            disabled={isUpdating}
            size="large"
            danger
          >
            Удалить лид
          </Button>
        </Popconfirm>

        <Space>
          <Button size="large" type="default" onClick={cancel}>
            Отмена
          </Button>

          <Button
            loading={isUpdating}
            disabled={isDeleting}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Сохранить
          </Button>
        </Space>
      </Flex>
    </Form>
  );
};
