import { Alert, App, Button } from "antd";
import { useContext } from "react";
import { LeadContext } from "../../LeadContext";
import { isBackendError } from "../../../../types/errorTypeGuards";
import { useGetExcelByFiltersMutation } from "../../../../store/api/leadActionsApi";

export const ExcelByFilters = () => {
  const { message, notification } = App.useApp();
  const { filters, entityId } = useContext(LeadContext);

  const [getExcelByFilters] = useGetExcelByFiltersMutation();

  const handleExport = async () => {
    if (!entityId) {
      message.error("Выберите сущность");
      return;
    }

    if (filters.length === 0) {
      message.error("Выберите фильтры");
      return;
    }

    try {
      const data = await getExcelByFilters({
        entityId,
        filters,
      }).unwrap();

      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Создаем ссылку для скачивания
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "leads.xlsx"); // Устанавливаем имя для скачивания
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
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
        description: "Произошла ошибка при загрузке Excel-файла",
      });
    }
  };

  return (
    <div>
      {filters.length === 0 && (
        <Alert
          showIcon
          message="Выберите фильтры"
          type="warning"
          style={{ marginBottom: 16 }}
        />
      )}

      <Button
        onClick={handleExport}
        type="primary"
        size="large"
        style={{ width: "100%" }}
        disabled={filters.length === 0}
      >
        Загузить Excel файл
      </Button>
    </div>
  );
};
