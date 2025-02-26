import { Button, Flex, Modal, Typography } from "antd";
import { useState, type Key } from "react";
import { ActionsSelect } from "../../../components/ActionsSelect";
import { MoveBackdoorLead } from "./Actions/MoveBackdoorLead";

const actions = [
  {
    key: 0,
    label: "Переместить бэкдоры в другой раздел",
    component: MoveBackdoorLead,
  },
];

export const BackdoorLeadOperations = ({
  selectedRowKeys,
  disabled,
}: {
  selectedRowKeys: Key[];
  disabled: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <ActionsSelect actions={actions} onCancel={() => setIsModalOpen(false)}>
          <Flex vertical style={{ marginBottom: 32 }}>
            <Typography.Title style={{ marginBottom: 0 }} level={3}>
              Действия для бэкдоров
            </Typography.Title>

            <Typography.Title level={5}>
              Выбрано бэкдоров: {selectedRowKeys.length}
            </Typography.Title>
          </Flex>
        </ActionsSelect>
      </Modal>
    </>
  );
};
