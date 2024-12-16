import { AutoComplete, Button, Flex, Form, Input, Typography } from "antd";

export const ActiveBackdoorCreateForm = () => {
  return (
    <>
      <Typography.Title style={{ marginBottom: 32 }} level={3}>
        Active Backdoor
      </Typography.Title>

      <Form layout="vertical">
        <Form.Item
          name="url"
          label="URL"
          rules={[{ required: true }, { type: "url" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Фамилия клиента"
          rules={[{ required: true }]}
        >
          <AutoComplete />
        </Form.Item>

        <Flex gap={8} justify="flex-end">
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Flex>
      </Form>
    </>
  );
};
