import { App, Form, Typography } from "antd";
import { IEntityField } from "../../../types/api/entityFieldsTypes";
import { useCreateBusinessObjectMutation } from "../../../store/api/businessObjectApi";
import { BusinessObjectForm } from "../../../components/BusinessObjectForm";

export const BusinessObjectCreateForm = ({
  entityId,
  onCancel,
  onSubmit,
  entityFields,
}: {
  entityId: string;
  onCancel: () => void;
  onSubmit: () => void;
  entityFields: IEntityField[];
}) => {
  const { notification } = App.useApp();

  const [createBusinessObject, { isLoading }] =
    useCreateBusinessObjectMutation();

  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown> & { name: string }) => {
    createBusinessObject({
      entityId,
      name: values.name,
      data: values,
    })
      .unwrap()
      .then(() => {
        form.resetFields();
        onCancel();

        notification.success({
          message: "Успешно",
          description: "Бизнес-объект успешно создан",
        });
      })
      .catch(() => {
        notification.error({
          message: "Ошибка",
          description: "Не удалось создать бизнес-объект",
        });
      });
    onSubmit();
  };

  return (
    <>
      <Typography.Title level={3}>Добавить бизнес-объект</Typography.Title>

      <BusinessObjectForm
        formProps={{
          form,
        }}
        entityFields={entityFields}
        onSubmit={onFinish}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </>
  );
};
