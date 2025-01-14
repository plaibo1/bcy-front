import { Form, Select } from "antd";
import { IEntityField } from "../../../types/api/entityFieldsTypes";

export const SelectField = ({
  field,
  initialValue,
}: {
  field: IEntityField;
  initialValue?: string;
}) => {
  return (
    <Form.Item
      label={field.label}
      name={field.name}
      initialValue={initialValue}
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
