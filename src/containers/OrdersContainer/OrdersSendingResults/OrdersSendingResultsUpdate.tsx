import { App, Button, Popconfirm } from "antd";
import { useOrdersDownloadExcelMutation } from "../../../store/api/orderApi";
import { useParams } from "react-router";
import { isBackendError } from "../../../types/errorTypeGuards";
import { DownloadOutlined } from "@ant-design/icons";

export const OrdersSendingResultsUpdate = () => {
  const { message, notification } = App.useApp();

  const { orderId } = useParams<{ orderId: string }>();
  const [downloadExcel] = useOrdersDownloadExcelMutation();

  const handleDownload = () => {
    if (!orderId) {
      message.error("Не удалось найти ID заказа");
      return;
    }

    downloadExcel({ orderId: orderId })
      .unwrap()
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "results.xlsx";
        link.click();
        window.URL.revokeObjectURL(url);
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
          description: "Не удалось скачать результаты",
        });
      });
  };

  return (
    <Popconfirm
      onConfirm={handleDownload}
      title="Вы уверены, что хотите скачать результаты?"
      okText="Да"
    >
      <Button icon={<DownloadOutlined />} type="primary">
        Скачать
      </Button>
    </Popconfirm>
  );
};
