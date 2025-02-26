import { Alert, App, Button, Flex } from "antd";
import { LeadSelect } from "../../../LeadContainer/LeadSelect";
import { useMoveBackdoorLeadMutation } from "../../../../store/api/backdoorLeadApi";
import { useState } from "react";
import { isBackendError } from "../../../../types/errorTypeGuards";
import { useContext } from "react";
import { BackdoorLeadContext } from "../../BackdoorLeadContext/BackdoorLeadContext";

export const MoveBackdoorLead = ({ onCancel }: { onCancel?: () => void }) => {
  const { notification } = App.useApp();
  const { selectedBackdoorLeads } = useContext(BackdoorLeadContext);

  const [moveBackdoorLead] = useMoveBackdoorLeadMutation();

  const [entityId, setEntityId] = useState<string | undefined>(undefined);

  const onSelectEntity = (entityId: string) => {
    setEntityId(entityId);
  };

  const moveLeads = async () => {
    if (!entityId) {
      return;
    }

    moveBackdoorLead({
      entityId,
      backdoorLeadIds: selectedBackdoorLeads as string[],
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Лиды успешно перемещены",
        });

        onCancel?.();
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
    <>
      {!selectedBackdoorLeads.length && (
        <Alert
          style={{ marginBottom: 16 }}
          type="warning"
          showIcon
          message="Не выбраны бэкдоры лидов"
        />
      )}

      <Flex align="flex-end" gap={16}>
        <LeadSelect onChange={onSelectEntity} />

        <Button
          disabled={!entityId || !selectedBackdoorLeads.length}
          size="large"
          type="primary"
          onClick={moveLeads}
        >
          Переместить выбранные
        </Button>
      </Flex>
    </>
  );
};
