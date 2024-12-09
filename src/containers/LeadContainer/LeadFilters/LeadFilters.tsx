import { Button, Col, Divider, Form, Input, Row, Space, theme } from "antd";
import { IEntityField } from "../../../types/api/entityFieldsTypes";
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { removeEmptyValues } from "../../../utils/removeEmptyValues";
import { createFilters } from "../../../utils/createFilters";

export const LeadFilters = ({
  entityFields,
  onFilters,
}: {
  entityFields: IEntityField[];
  onFilters: (filters: IFilter[]) => void;
}) => {
  const {
    token: { borderRadiusLG, colorBorder },
  } = theme.useToken();
  const [form] = Form.useForm();

  const [showFilters, setShowFilters] = useState(false);

  const onFinish = (
    values: Record<keyof IEntityField, string | number | boolean>
  ) => {
    const filters = createFilters(removeEmptyValues(values), entityFields);
    onFilters(filters);
  };

  const handleReset = () => {
    onFilters([]);
    form.resetFields();
  };

  return (
    <div>
      <Button
        style={{ marginBottom: 24 }}
        onClick={() => setShowFilters(!showFilters)}
        icon={<FilterOutlined />}
        type={showFilters ? "primary" : "default"}
      >
        {showFilters ? "Скрыть" : "Показать"} фильтры
      </Button>

      {showFilters && (
        <div
          style={{
            border: `1px solid ${colorBorder}`,
            padding: 16,
            borderRadius: borderRadiusLG,
            marginBottom: 32,
          }}
        >
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Row gutter={[16, 0]}>
              <Col span={4}>
                <Form.Item label="Имя" name="name">
                  <Input size="large" type="text" />
                </Form.Item>
              </Col>

              {entityFields.map((field) => {
                // if (field.type === "BOOLEAN") {
                //   return (
                //     <Col key={field.id} span={4}>
                //       <Form.Item label={field.label} name={field.name}>
                //         <Checkbox  />
                //       </Form.Item>
                //     </Col>
                //   );
                // }

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
        </div>
      )}
    </div>
  );
};
