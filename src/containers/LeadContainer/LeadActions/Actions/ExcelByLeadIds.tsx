import { useContext } from "react";
import { LeadContext } from "../../LeadContext";
import { Alert, App, Button } from "antd";
import { useGetExcelByIdsMutation } from "../../../../store/api/leadActionsApi";
import { isBackendError } from "../../../../types/errorTypeGuards";

export const ExcelByLeadIds = () => {
  const { message, notification } = App.useApp();
  const { selectedLeads, entityId } = useContext(LeadContext);
  const [getExcelByIds] = useGetExcelByIdsMutation();

  const handleExport = async () => {
    if (!entityId) {
      message.error("Выберите сущность");
      return;
    }

    if (selectedLeads.length === 0) {
      message.error("Выберите лиды");
      return;
    }

    try {
      const data = await getExcelByIds({
        entityId,
        leadIds: selectedLeads.map((item) => String(item)),
      }).unwrap();

      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Создаем ссылку для скачивания
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      if (isBackendError(error)) {
        notification.error({
          message: "Ошибка",
          description: error.data.message,
        });
        return;
      }

      notification.error({
        message: "Ошибка",
        description: "Произошла ошибка при скачивании Excel файла",
      });
    }
  };

  return (
    <div>
      {selectedLeads.length === 0 && (
        <Alert
          showIcon
          message="Выберите лиды"
          type="warning"
          style={{ marginBottom: 16 }}
        />
      )}

      <Button
        onClick={handleExport}
        type="primary"
        size="large"
        style={{ width: "100%" }}
        disabled={selectedLeads.length === 0}
      >
        Загузить Excel файл
      </Button>
    </div>
  );
};
