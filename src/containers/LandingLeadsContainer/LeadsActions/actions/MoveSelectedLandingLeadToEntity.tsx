import { useMoveToEntityMutation } from "../../../../store/api/landingLeadsApi";
import { useContext, useState } from "react";
import { LandingLeadsContext } from "../../LandingLeadsContext/LandingLeadsContext";
import { Alert, App, Button, Flex, Form } from "antd";
import { LeadSelect } from "../../../LeadContainer/LeadSelect";
import { isBackendError } from "../../../../types/errorTypeGuards";

export const MoveSelectedLandingLeadToEntity = ({
  onCancel,
}: {
  onCancel?: () => void;
}) => {
  const { notification } = App.useApp();

  const [moveToEntity] = useMoveToEntityMutation();
  const [entityId, setEntityId] = useState<string>();

  const { selectedLandingLeads, setSelectedLandingLeads } =
    useContext(LandingLeadsContext);

  const onSelectEntity = (entityId: string) => {
    setEntityId(entityId);
  };

  const onFinish = () => {
    if (!entityId) {
      return;
    }

    moveToEntity({
      landingLeadIds: selectedLandingLeads,
      entityId,
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Лиды успешно перемещены",
        });

        onCancel?.();
        setSelectedLandingLeads([]);
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
      {!selectedLandingLeads.length && (
        <Alert
          style={{ marginBottom: 16 }}
          type="warning"
          showIcon
          message="Не выбраны лиды"
        />
      )}

      <Flex vertical gap={16}>
        <Form onFinish={onFinish} size="large" layout="vertical">
          <Flex>
            <Form.Item label="Сущность">
              <LeadSelect onChange={onSelectEntity} />
            </Form.Item>

            <Button
              disabled={!entityId || !selectedLandingLeads.length}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Переместить выбранные
            </Button>
          </Flex>
        </Form>
      </Flex>
    </div>
  );
};
