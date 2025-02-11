import { Button, Modal } from "antd";
import { useState } from "react";
import { BusinessObjectCreateForm } from "./BusinessObjectCreateForm";
import { IEntityField } from "../../../types/api/entityFieldsTypes";

export const AddBusinessObject = ({
  entityId,
  onSubmit,
  entityFields,
}: {
  entityId: string;
  onSubmit: () => void;
  entityFields: IEntityField[];
}) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <Button size="large" type="default" onClick={() => setIsShowModal(true)}>
        Добавить Лид
      </Button>

      <Modal
        open={isShowModal}
        onCancel={() => setIsShowModal(false)}
        footer={null}
        width={800}
      >
        <BusinessObjectCreateForm
          entityFields={entityFields}
          entityId={entityId}
          onCancel={() => setIsShowModal(false)}
          onSubmit={() => onSubmit()}
        />
      </Modal>
    </>
  );
};
