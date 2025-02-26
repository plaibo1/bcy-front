import { Button, Flex, Modal, Typography } from "antd";
import { useState, type Key } from "react";
import { ActionsSelect } from "../../../components/ActionsSelect";
import { MoveBackdoorLead } from "./Actions/MoveBackdoorLead";
import { ExcelByFilters } from "./Actions/ExcelByFilters";

const actions = [
  {
    key: 0,
    label: "Переместить бэкдоры в другой раздел",
    component: MoveBackdoorLead,
  },
  {
    key: 1,
    label: "Создать Excel-файл по фильтрам",
    component: ExcelByFilters,
  },
];

export const BackdoorLeadOperations = ({
  selectedRowKeys,
}: {
  selectedRowKeys: Key[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setIsModalOpen(true)}>
        Действия
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <ActionsSelect actions={actions} onCancel={() => setIsModalOpen(false)}>
          <Flex vertical style={{ marginBottom: 32 }}>
            <Typography.Title style={{ marginBottom: 4 }} level={3}>
              Действия для бэкдоров
            </Typography.Title>

            <Typography.Text>
              Выбрано бэкдоров: {selectedRowKeys.length}
            </Typography.Text>
          </Flex>
        </ActionsSelect>
      </Modal>
    </>
  );
};
