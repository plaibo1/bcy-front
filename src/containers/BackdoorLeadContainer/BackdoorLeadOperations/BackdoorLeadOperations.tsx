import { App, Button, Flex, Modal, Typography } from "antd";
import { useState, type Key } from "react";
import { LeadSelect } from "../../LeadContainer/LeadSelect";
import { useMoveBackdoorLeadMutation } from "../../../store/api/backdoorLeadApi";
import { isBackendError } from "../../../types/errorTypeGuards";

export const BackdoorLeadOperations = ({
  selectedRowKeys,
  disabled,
}: {
  selectedRowKeys: Key[];
  disabled: boolean;
}) => {
  const { notification } = App.useApp();
  const [moveBackdoorLead] = useMoveBackdoorLeadMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      backdoorLeadIds: selectedRowKeys as string[],
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Лиды успешно перемещены",
        });

        setIsModalOpen(false);
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
      <Button
        disabled={disabled}
        size="large"
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Действия
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="fit-content"
      >
        <Flex vertical style={{ marginBottom: 32 }}>
          <Typography.Title style={{ marginBottom: 0 }} level={3}>
            Действия для бэкдоров
          </Typography.Title>

          <Typography.Title level={5}>
            Выбрано бэкдоров: {selectedRowKeys.length}
          </Typography.Title>
        </Flex>

        <Flex align="flex-end" gap={16}>
          <LeadSelect onChange={onSelectEntity} />
          <Button
            disabled={!entityId}
            size="large"
            type="primary"
            onClick={moveLeads}
          >
            Переместить выбранные
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
