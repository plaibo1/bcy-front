import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Switch,
} from "antd";
import { SelectField } from "../../containers/LeadContainer/LeadFilters/SelectField";
import { type IEntityField } from "../../types/api/entityFieldsTypes";
import dayjs from "dayjs";
import { FormProps } from "antd/lib";
import { Rule } from "antd/es/form";
import { PhoneInput } from "../PhoneInput";

interface IProps {
  entityFields: IEntityField[];
  onSubmit: (values: Record<string, unknown> & { name: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
  formProps?: FormProps;
  submitButtonText?: string;
}

export const BusinessObjectForm = ({
  entityFields,
  onSubmit,
  onCancel,
  isLoading,
  formProps,
  submitButtonText,
}: IProps) => {
  const onFinish = (values: Record<string, string | number | boolean>) => {
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

    onSubmit(res as Record<string, unknown> & { name: string });
  };

  return (
    <Form size="large" layout="vertical" onFinish={onFinish} {...formProps}>
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: "Поле обязательно" }]}
      >
        <Input />
      </Form.Item>

      {entityFields.map((field) => {
        // console.log("🚀 ~ {entityFields.map ~ field:", {
        //   name: field.name,
        //   reqirreid: field.required,
        // });

        const FiledWrapper = ({
          children,
          rules,
        }: {
          children: React.ReactNode;
          rules?: Rule[];
        }) => {
          return (
            <Form.Item
              label={field.label}
              name={field.name}
              rules={[
                { required: field.required, message: "Поле обязательно" },
                ...(rules ? rules : []),
              ]}
            >
              {children}
            </Form.Item>
          );
        };

        if (field.readOnly) {
          return (
            <FiledWrapper key={field.name}>
              <Input disabled size="large" />
            </FiledWrapper>
          );
        }

        if (field.settings?.labelValues) {
          return <SelectField key={field.name} field={field} />;
        }

        if (field.type === "DATE") {
          return (
            <FiledWrapper key={field.name}>
              <DatePicker size="large" format="DD.MM.YYYY" />
            </FiledWrapper>
          );
        }

        if (field.type === "DATETIME") {
          return (
            <FiledWrapper key={field.name}>
              <DatePicker showTime size="large" format="DD.MM.YYYY HH:mm:ss" />
            </FiledWrapper>
          );
        }

        if (field.type === "BOOLEAN") {
          return (
            <FiledWrapper key={field.name}>
              <Switch size="default" />
            </FiledWrapper>
          );
        }

        if (field.type === "NUMBER") {
          return (
            <FiledWrapper key={field.name}>
              <InputNumber
                style={{ minWidth: 150, width: "fit-content" }}
                size="large"
              />
            </FiledWrapper>
          );
        }

        if (field.name === "email") {
          return (
            <FiledWrapper key={field.name}>
              <Input size="large" />
            </FiledWrapper>
          );
        }

        if (field.type === "PHONE") {
          return (
            <FiledWrapper key={field.name}>
              <PhoneInput />
            </FiledWrapper>
          );
        }

        return (
          <FiledWrapper key={field.name}>
            <Input size="large" />
          </FiledWrapper>
        );
      })}

      <Flex justify="flex-end" gap={16}>
        <Button size="large" type="default" onClick={onCancel}>
          Отмена
        </Button>

        <Button
          loading={isLoading}
          size="large"
          type="primary"
          htmlType="submit"
        >
          {submitButtonText || "Создать"}
        </Button>
      </Flex>
    </Form>
  );
};
