import { Button, Modal } from "antd";
import { useState } from "react";
import { ActionsSelect } from "../../../components/ActionsSelect";
import { MoveSelectedLandingLeadToEntity } from "./actions/MoveSelectedLandingLeadToEntity";

const actions = [
  {
    key: 0,
    label: "Переместить лэндинг лиды в лиды сущности",
    component: MoveSelectedLandingLeadToEntity,
  },
];

export const LandingLeadsActions = () => {
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
        <ActionsSelect
          actions={actions}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};
