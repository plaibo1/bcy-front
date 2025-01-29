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
          description: "Активный бекдор успешно удален",
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
          description: "При удалении активного бекдора произошла ошибка",
        });
      });
  };

  return (
    <Space>
      <Link to={`/active-backdoors/${id}`}>
        <Button icon={<SettingOutlined />} />
      </Link>

      <Popconfirm title="Удалить активный бекдор" onConfirm={handleDelete}>
        <Button danger icon={<DeleteOutlined />} loading={isLoading} />
      </Popconfirm>
    </Space>
  );
};
