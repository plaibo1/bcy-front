import { useContext, useState } from "react";
import { IVRContext } from "../../IVRContext/IVRContext";
import { Alert, App, Button, Flex, Form, InputNumber } from "antd";
import { isBackendError } from "../../../../types/errorTypeGuards";
import { useMoveIvrMutation } from "../../../../store/api/ivrApi";
import { LeadSelect } from "../../../LeadContainer/LeadSelect";

export const MoveSelectedIVR = ({ onCancel }: { onCancel?: () => void }) => {
  const { notification } = App.useApp();
  const { selectedIVRs, setSelectedIVRs } = useContext(IVRContext);
  const [entityId, setEntityId] = useState<string>();

  const [moveIvrMutation] = useMoveIvrMutation();

  const onSelectEntity = (entityId: string) => {
    setEntityId(entityId);
  };

  const onFinish = (values: { sum: number }) => {
    console.log(values);

    if (!entityId) {
      return;
    }

    moveIvrMutation({
      entityId,
      ivrIds: selectedIVRs as string[],
      sum: values.sum,
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Лиды успешно перемещены",
        });

        onCancel?.();
        setSelectedIVRs([]);
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
          description: "Произошла ошибка при перемещении бэкдоров",
        });
      });
  };

  return (
    <div>
      {!selectedIVRs.length && (
        <Alert
          style={{ marginBottom: 16 }}
          type="warning"
          showIcon
          message="Не выбраны IVR"
        />
      )}

      <Flex vertical gap={16}>
        <Form
          onFinish={onFinish}
          size="large"
          layout="vertical"
          initialValues={{ sum: 300 }}
        >
          <Flex align="flex-end" gap={16}>
            <Form.Item
              label="Сумма"
              name="sum"
              rules={[{ required: true, message: "Пожалуйста, введите сумму" }]}
            >
              <InputNumber style={{ width: 200 }} />
            </Form.Item>

            <Form.Item label="Сущность">
              <LeadSelect onChange={onSelectEntity} />
            </Form.Item>
          </Flex>

          <Button
            disabled={!entityId || !selectedIVRs.length}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Переместить выбранные
          </Button>
        </Form>
      </Flex>
    </div>
  );
};
