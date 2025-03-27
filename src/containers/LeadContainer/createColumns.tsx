// import { ColumnsType } from "antd/es/table";
import { AnyObject } from "antd/es/_util/type";
import { type IEntityField } from "../../types/api/entityFieldsTypes";
import { type ColumnType } from "antd/lib/table";

import { DateTimeCeil } from "../../components/Ceils/DateTimeCeil";
import { AuditCeil } from "../../components/Ceils/AuditCeil";
import dayjs from "dayjs";

import { EditButton } from "./EditLead";
import { type IBusinessObject } from "../../types/api/businessObjectTypes";
import { Table, Tag } from "antd";
import { sourceTypeMap } from "../../consts";
import { TagProps } from "antd/lib";

interface ICreateColumns {
  columnsFields: IEntityField[];
}

const STATUSES_COLORS: Record<string, TagProps["color"]> = {
  INTERVAL: "purple",
  NOT_SENT: "default",
  SENT: "success",
  SCHEDULED: "geekblue",
};

export const createColumns = <T extends AnyObject>({
  columnsFields,
}: ICreateColumns): ColumnType<T>[] => {
  const baseColumns: ColumnType<T>[] = [
    Table.SELECTION_COLUMN,
    {
      title: "Источник",
      dataIndex: "sourceType",
      key: "sourceType",
      width: 160,
      render: (sourceType) => sourceTypeMap[sourceType] || sourceType,
    },
    {
      title: "Сводка",
      dataIndex: "audit",
      render: (record) => <AuditCeil record={record} />,
      width: 250,
    },
    {
      title: "Имя",
      dataIndex: "name",
      render: (name) => <strong>{name}</strong>,
    },
  ];

  const generatedColumns: ColumnType<T>[] = columnsFields.map((column) => {
    return {
      title: column.label,
      dataIndex: `data`,
      render: (_, record) => {
        const value = record?.data[column.name];

        // ВРЕМЕННЫЙ ХАРДКОД
        if (column.name === "status" && column.settings?.labelValues) {
          return (
            <Tag color={STATUSES_COLORS[value] || "default"}>
              {column.settings.labelValues[value] ?? value}
            </Tag>
          );
        }

        if (column.settings?.labelValues) {
          return column.settings.labelValues[value] ?? value;
        }

        if (column.type === "STRING") {
          return value;
        }

        if (column.type === "DATE") {
          if (!value || value.trim() === "" || typeof value !== "string") {
            return null;
          }

          return dayjs(value).format("DD.MM.YYYY");
        }

        if (column.type === "DATETIME") {
          return <DateTimeCeil value={value} />;
        }

        if (column.type === "BOOLEAN") {
          if (typeof value === "undefined") {
            return null;
          }

          return value ? "Да" : "Нет";
        }

        return value;
      },
    };
  });

  const systemColumns: ColumnType<T>[] = [
    {
      align: "center",
      render: (_, record, index) => {
        return (
          <EditButton
            boItem={record as unknown as IBusinessObject}
            entityFields={columnsFields}
            entityId={columnsFields[0]?.entityId}
            index={index}
          />
        );
      },
    },
  ];

  return baseColumns.concat(generatedColumns, systemColumns);
};
