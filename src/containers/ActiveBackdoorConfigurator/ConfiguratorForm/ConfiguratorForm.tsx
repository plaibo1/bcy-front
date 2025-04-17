import { Button, Divider, Form, Input, Tag } from "antd";
import { IConfigurationItem } from "../../../types/api/configuratorBackdoor";
import { FormInstance } from "antd/lib";

export const ConfiguratorForm = ({
  configItems,
  onRemove,
  onSubmit,
  onClear,
  initialValues,
  form
}: {
  configItems: Record<string, IConfigurationItem>;
  initialValues?: Record<string, string>;
  onRemove: (key: string) => void;
  onSubmit: (values: Record<string, string>) => void;
  onClear: () => void;
  form?: FormInstance;
}) => {
  return (
    <Form form={form} initialValues={initialValues} onFinish={onSubmit}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Tag
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
          }}
          onClick={onClear}
          color="red"
        >
          Удалить все
        </Tag>

        {Object.entries(configItems).map(([key]) => {
          return (
            <Tag
              key={key}
              style={{ display: "flex", alignItems: "center" }}
              color="blue"
              closable
              onClose={() => onRemove(key)}
            >
              {key}

              <Divider type="vertical" />

              <Form.Item
                name={key}
                style={{ margin: 0, padding: 4, paddingLeft: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Заполните или удалите поле",
                  },
                ]}
              >
                <Input size="small" />
              </Form.Item>
            </Tag>
          );
        })}
      </div>

      <Divider />

      <Button htmlType="submit" size="large">
        Собрать конфигурацию
      </Button>
    </Form>
  );
};
