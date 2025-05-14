import { App, Button, Form, Modal, Select, Space, Typography } from "antd";
import { useEditActiveBackdoorMutation } from "../../../store/api/activeBackdoorsApi";
import { isBackendError } from "../../../types/errorTypeGuards";

import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { type IActiveBackdoor } from "../../../types/api/activeBackdoorsTypes";

export const EditActiveBackdoor = ({
  id,
  record,
}: {
  id: string;
  record: IActiveBackdoor;
}) => {
  const { notification } = App.useApp();
  const [editActiveBackdoor] = useEditActiveBackdoorMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = ({ status }: { status: string }) => {
    if (!status) return;

    editActiveBackdoor({
      id,
      status,
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Статус обновлен",
        });
      })
      .catch((err) => {
        if (isBackendError(err)) {
          notification.error({
            message: "Ошибка",
            description: err.data.message,
          });
          return;
        }
        notification.error({
          message: "Ошибка",
          description: "При обновлении статуса произошла ошибка",
        });
      });
  };

  return (
    <>
      <Button icon={<EditOutlined />} onClick={() => setIsModalOpen(true)} />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Typography.Title level={3} style={{ marginBottom: 32 }}>
          Реадиктрование конфигурации
        </Typography.Title>

        <Form
          size="large"
          onFinish={onFinish}
          initialValues={{ status: record.status }}
        >
          <Form.Item name="status" label="Статус">
            <Select>
              <Select.Option value="REFRESH">REFRESH</Select.Option>
              <Select.Option value="BLOCKED">BLOCKED</Select.Option>
            </Select>
          </Form.Item>

          <Space>
            <Button htmlType="submit" size="large" type="primary">
              Изменить
            </Button>
            <Button size="large" onClick={() => setIsModalOpen(false)}>
              Отмена
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
