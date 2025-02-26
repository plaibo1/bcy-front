import { Form, Select } from "antd";
import { IEntityField } from "../../../types/api/entityFieldsTypes";

export const SelectField = ({
  field,
  initialValue,
  noRules,
}: {
  field: IEntityField;
  initialValue?: string;
  noRules?: boolean;
}) => {
  return (
    <Form.Item
      label={field.label}
      name={field.name}
      initialValue={initialValue}
      rules={
        noRules
          ? []
          : [{ required: field.required, message: "Поле обязательно" }]
      }
    >
      <Select size="large" allowClear showSearch>
        <Select.Option value={null}>Не заданно</Select.Option>

        {Object.entries(field.settings?.labelValues ?? {}).map(
          ([value, label]) => (
            <Select.Option key={value} value={value}>
              {label ?? value}
            </Select.Option>
          )
        )}
      </Select>
    </Form.Item>
  );
};
