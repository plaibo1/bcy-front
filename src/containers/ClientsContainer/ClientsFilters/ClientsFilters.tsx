import { Rule } from "antd/es/form";
import { FiltersButton } from "../../../components/FiltersButton";
import { IClient } from "../../../types/api/clientsType";
import { Button, Col, Divider, Input, Row, Space } from "antd";
import { Form } from "antd/lib";
import { removeEmptyValues } from "../../../utils/removeEmptyValues";
import { createFilters } from "../../../utils/createFilters";

const formFields: Record<
  keyof Omit<IClient, "id" | "orders">,
  { label: string; operation?: FiltersOperations; rules?: Rule[] }
> = {
  firstName: { label: "Имя", operation: "starts with" },
  lastName: { label: "Фамилия", operation: "starts with" },
  middleName: { label: "Отчество", operation: "starts with" },
  email: {
    label: "Email",
    rules: [{ type: "email", message: "Некорректный email" }],
  },
  comment: { label: "Комментарий", operation: "contains" },
};

export const ClientsFilters = ({
  onFilters,
}: {
  onFilters: (filters: IFilter[]) => void;
}) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onFilters([]);
  };

  const handleFinish = (
    res: Record<keyof Omit<IClient, "id" | "orders">, string>
  ) => {
    const values = removeEmptyValues(res);

    if (Object.keys(values).length === 0) {
      return;
    }

    onFilters(createFilters(values));
  };

  return (
    <FiltersButton>
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={[16, 0]}>
          {Object.entries(formFields).map(([key, { label, rules }]) => (
            <Col span={3} key={key}>
              <Form.Item label={label} name={key} rules={rules}>
                <Input size="large" type="text" />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Divider />

        <Space size="middle">
          <Button size="large" type="primary" htmlType="submit">
            Применить
          </Button>

          <Button size="large" type="default" onClick={handleReset}>
            Сбросить
          </Button>
        </Space>
      </Form>
    </FiltersButton>
  );
};
