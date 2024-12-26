import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import { type FilterFormCreateMap } from "../../types/filterTypes";
import { createDeclarativeFilters } from "../../utils/createDeclarativeFilters";
import { removeEmptyValues } from "../../utils/removeEmptyValues";
import { FormProps } from "antd/lib/form";

interface Props<T extends Record<string, unknown>> {
  fields: FilterFormCreateMap<T>;

  onFilterChange: (filters: IFilter[]) => void;
  onCancel?: () => void;
  formProps?: FormProps;
}

export const CreateFilters = <T extends Record<string, unknown>>({
  fields,
  onFilterChange,
  onCancel,
  formProps,
}: Props<T>) => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<keyof T, string>) => {
    if (Object.keys(values).length === 0) {
      return;
    }

    const sanitizedValues = removeEmptyValues(values) as Record<
      keyof T,
      string | number | boolean
    >;

    onFilterChange(createDeclarativeFilters(fields, sanitizedValues));
  };

  const onClearFields = () => {
    form.resetFields();
    onFilterChange([]);
    onCancel?.();
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} {...formProps}>
        <Row gutter={[16, 0]}>
          {Object.entries(fields).map(([fieldKey, field]) => {
            const Wrapper = ({ children }: { children: React.ReactNode }) => {
              return (
                <Col key={fieldKey} span={field.colSpan || 4}>
                  <Form.Item
                    label={field.label}
                    name={fieldKey}
                    rules={field.rules}
                  >
                    {children}
                  </Form.Item>
                </Col>
              );
            };

            if (typeof field.type === "undefined") {
              return (
                <Wrapper key={fieldKey}>
                  <Input type="text" />
                </Wrapper>
              );
            }

            if (field.type === "date") {
              return (
                <Wrapper key={fieldKey}>
                  <DatePicker format="DD.MM.YYYY" />
                </Wrapper>
              );
            }

            if (field.type === "datetime") {
              return (
                <Wrapper key={fieldKey}>
                  <DatePicker format="DD.MM.YYYY HH:mm" />
                </Wrapper>
              );
            }

            if (field.type === "dateRange") {
              return (
                <Wrapper key={fieldKey}>
                  <DatePicker.RangePicker
                    format="DD.MM.YYYY"
                    // TODO: operation resolver to  allowEmpty={[true, true]}
                  />
                </Wrapper>
              );
            }

            return (
              <Wrapper key={fieldKey}>
                <input type="text" />
              </Wrapper>
            );
          })}
        </Row>

        <Divider />

        <Space size="middle">
          <Button type="primary" htmlType="submit">
            Применить
          </Button>

          <Button onClick={onClearFields}>Очистить</Button>
        </Space>
      </Form>
    </>
  );
};
