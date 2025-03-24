import { Button, Modal } from "antd";
import { MoveSelectedIVR } from "./actions/MoveSelectedIVR";
import { ActionsSelect } from "../../../components/ActionsSelect";
import { useState } from "react";

const actions = [
  {
    key: 0,
    label: "Переместить IVR",
    component: MoveSelectedIVR,
  },
];

export const IVRActions = () => {
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
