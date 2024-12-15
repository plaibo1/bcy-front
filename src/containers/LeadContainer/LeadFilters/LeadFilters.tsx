import { Button, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import { IEntityField } from "../../../types/api/entityFieldsTypes";
import { removeEmptyValues } from "../../../utils/removeEmptyValues";
import { createEntityFilters } from "../../../utils/createEntityFilters";
import { FiltersButton } from "../../../components/FiltersButton";

export const LeadFilters = ({
  entityFields,
  onFilters,
}: {
  entityFields: IEntityField[];
  onFilters: (filters: IFilter[]) => void;
}) => {
  const [form] = Form.useForm();

  const onFinish = (
    values: Record<keyof IEntityField, string | number | boolean>
  ) => {
    const filters = createEntityFilters(
      removeEmptyValues(values),
      entityFields
    );
    onFilters(filters);
  };

  const handleReset = () => {
    onFilters([]);
    form.resetFields();
  };

  return (
    <FiltersButton>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[16, 0]}>
          <Col span={4}>
            <Form.Item label="Имя" name="name">
              <Input size="large" type="text" />
            </Form.Item>
          </Col>

          {entityFields.map((field) => {
            if (field.type === "BOOLEAN") {
              return (
                <Col key={field.id} span={4}>
                  <Form.Item label={field.label} name={field.name}>
                    <Select size="large">
                      <Select.Option value={null}>Не заданно</Select.Option>
                      <Select.Option value={true}>Да</Select.Option>
                      <Select.Option value={false}>Нет</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              );
            }

            return (
              <Col key={field.id} span={4}>
                <Form.Item label={field.label} name={field.name}>
                  <Input size="large" type="text" />
                </Form.Item>
              </Col>
            );
          })}
        </Row>

        <Divider />

        <Space size="middle">
          <Button htmlType="submit" type="primary" size="large">
            Применить
          </Button>

          <Button onClick={handleReset} htmlType="button" size="large">
            Очистить
          </Button>
        </Space>
      </Form>
    </FiltersButton>
  );
};
