import { App, Button, Flex, Form, Input, Select, Switch } from "antd";
import {
  IEntityCreate,
  type EntityType,
} from "../../../types/api/entityFieldsTypes";
import { ENTITY_FIELD_TYPES_MAP } from "../../../consts";

import { PlusCircleFilled } from "@ant-design/icons";
import { useCreateEntityMutation } from "../../../store/api/entityApi";

const { TextArea } = Input;

const options = Object.keys(ENTITY_FIELD_TYPES_MAP).map((key) => {
  return {
    value: key as EntityType,
    label: ENTITY_FIELD_TYPES_MAP[key as EntityType].label,
  };
});

/**
 * @todo Переписать нормально
 */
export const LeadAddFieldForm = ({
  cancel,
  entityId,
  onSubmit,
}: {
  onSubmit: () => void;
  cancel: () => void;
  entityId: string | undefined;
}) => {
  const [createEntity] = useCreateEntityMutation();
  const { message, notification } = App.useApp();

  const onFinish = (values: IEntityCreate) => {
    console.log("Success:", values);

    if (!entityId) {
      message.error("Выберите сущность");
      return;
    }

    createEntity({ ...values, entityId })
      .unwrap()
      .then((res) => {
        notification.success({
          message: "Успешно",
          description: (
            <span>
              Поле <b>{res.label}</b> успешно создано
            </span>
          ),
        });
        onSubmit();
      });
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="Имя в таблице"
        name="label"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Системное имя поля"
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Описание поля"
        name="description"
        rules={[{ required: true }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item label="Тип поля" name="type" rules={[{ required: true }]}>
        <Select options={options} />
      </Form.Item>

      <Form.Item label="system" name="system">
        <Switch />
      </Form.Item>

      <Form.Item label="Спрятанно от пользователя" name="hiddenFromUser">
        <Switch />
      </Form.Item>

      <Form.Item label="Спрятанно в интерфейсе" name="hiddenFromUi">
        <Switch />
      </Form.Item>

      <Form.Item label="Архививано" name="archived">
        <Switch />
      </Form.Item>

      <Form.Item label="Только для чтения" name="readOnly">
        <Switch />
      </Form.Item>

      <Form.Item label="Обязательное" name="required">
        <Switch />
      </Form.Item>

      <Flex gap={16} justify="flex-end">
        <Button htmlType="button" onClick={cancel} size="large">
          Отмена
        </Button>

        <Button
          iconPosition="end"
          icon={<PlusCircleFilled />}
          type="primary"
          htmlType="submit"
          size="large"
        >
          Доавбить
        </Button>
      </Flex>
    </Form>
  );
};
