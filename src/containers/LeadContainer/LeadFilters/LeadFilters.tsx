import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { IEntityField } from "../../../types/api/entityFieldsTypes";
import { removeEmptyValues } from "../../../utils/removeEmptyValues";
import { createEntityFilters } from "../../../utils/createEntityFilters";
import { FiltersButton } from "../../../components/FiltersButton";
import { SelectField } from "./SelectField";
import { PhoneInput } from "../../../components/PhoneInput";

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
            if (field.settings?.labelValues) {
              return (
                <Col key={field.id} span={4}>
                  <SelectField field={field} />
                </Col>
              );
            }

            if (field.type === "DATE") {
              return (
                <Col key={field.id} span={4}>
                  <Form.Item label={field.label} name={field.name}>
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      format="DD.MM.YYYY"
                    />
                  </Form.Item>
                </Col>
              );
            }

            if (field.type === "DATETIME") {
              return (
                <Col key={field.id} span={4}>
                  <Form.Item label={field.label} name={field.name}>
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      showTime
                      format="DD.MM.YYYY HH:mm"
                    />
                  </Form.Item>
                </Col>
              );
            }

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

            if (field.type === "PHONE") {
              return (
                <Col key={field.id} span={4}>
                  <Form.Item label={field.label} name={field.name}>
                    <PhoneInput />
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
