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
import { FiltersButton } from "../../../components/FiltersButton";
import { IBackdoorLead } from "../../../types/api/backdoorLeadTypes";
import { type Rule } from "antd/es/form";
import { removeEmptyValues } from "../../../utils/removeEmptyValues";
import { createFilters } from "../../../utils/createFilters";

const { RangePicker } = DatePicker;

const fields: Record<
  keyof IBackdoorLead,
  { label: string; rules?: Rule[]; operations?: FiltersOperations }
> = {
  source: {
    label: "Источник",
    rules: [{ type: "url", message: "Некорректная ссылка" }],
  },
  fullName: { label: "ФИО" },
  phone: { label: "Телефон" },
  region: { label: "Регион" },
  email: {
    label: "Email",
    rules: [{ type: "email", message: "Некорректный email" }],
  },
  comment: { label: "Комментарий" },
  log: { label: "Лог" },
};

export const BackdoorLeadFilters = ({
  onFilters,
}: {
  onFilters: (filters: IFilter[]) => void;
}) => {
  const [form] = Form.useForm();

  const onFinish = (res: Record<keyof IBackdoorLead, string>) => {
    const values = removeEmptyValues(res);

    if (Object.keys(values).length === 0) {
      return;
    }

    onFilters(createFilters(values, { operation: "starts with" }));
  };

  const handleReset = () => {
    form.resetFields();
    onFilters([]);
  };

  return (
    <FiltersButton>
      <Form form={form} layout="vertical" size="large" onFinish={onFinish}>
        <Row gutter={[16, 0]}>
          <Col span={5}>
            <Form.Item label="Дата" name="date">
              <RangePicker allowEmpty format="DD.MM.YYYY" />
            </Form.Item>
          </Col>

          {Object.entries(fields).map(([key, { label, rules }]) => (
            <Col key={key} span={4}>
              <Form.Item label={label} name={key} rules={rules}>
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Divider />

        <Space size="middle">
          <Button type="primary" htmlType="submit">
            Применить
          </Button>

          <Button type="default" htmlType="reset" onClick={handleReset}>
            Сбросить
          </Button>
        </Space>
      </Form>
    </FiltersButton>
  );
};
