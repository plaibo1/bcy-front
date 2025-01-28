import { App, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteActiveBackdoorMutation } from "../../../store/api/activeBackdoorsApi";
import { isBackendError } from "../../../types/errorTypeGuards";

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
    <Popconfirm title="Удалить активный бекдор" onConfirm={handleDelete}>
      <Button danger icon={<DeleteOutlined />} loading={isLoading} />
    </Popconfirm>
  );
};
