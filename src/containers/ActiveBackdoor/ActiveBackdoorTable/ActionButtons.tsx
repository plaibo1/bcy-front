import { App, Button, Popconfirm, Space } from "antd";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { useDeleteActiveBackdoorMutation } from "../../../store/api/activeBackdoorsApi";
import { isBackendError } from "../../../types/errorTypeGuards";
import { Link } from "react-router";

export const RemoveActiveBackdoor = ({ id }: { id: string }) => {
  const { notification } = App.useApp();
  const [deleteActiveBackdoor, { isLoading }] =
    useDeleteActiveBackdoorMutation();

  const handleDelete = () => {
    deleteActiveBackdoor(id)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Интеграция успешно удалена",
        });
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
          description: "При удалении интеграции произошла ошибка",
        });
      });
  };

  return (
    <Space>
      <Link to={`/active-backdoors/${id}`}>
        <Button icon={<SettingOutlined />} />
      </Link>

      <Popconfirm title="Удалить интеграцию" onConfirm={handleDelete}>
        <Button danger icon={<DeleteOutlined />} loading={isLoading} />
      </Popconfirm>
    </Space>
  );
};
