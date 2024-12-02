// import { ColumnsType } from "antd/es/table";
import { AnyObject } from "antd/es/_util/type";
import { type IEntityField } from "../../types/api/entityFieldsTypes";
import { type ColumnType } from "antd/lib/table";

import { DateTimeCeil } from "../../components/Ceils/DateTimeCeil";
import { AuditCeil } from "../../components/Ceils/AuditCeil";
import dayjs from "dayjs";

import { EditButton } from "./EditLead";
import { type IBusinessObject } from "../../types/api/businessObjectTypes";

interface ICreateColumns {
  columnsFields: IEntityField[];
}

export const createColumns = <T extends AnyObject>({
  columnsFields,
}: ICreateColumns): ColumnType<T>[] => {
  const baseColumns: ColumnType<T>[] = [
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

        if (column.type === "STRING") {
          return value;
        }

        if (column.type === "DATE") {
          return dayjs(value).format("DD.MM.YYYY");
        }

        if (column.type === "DATETIME") {
          return <DateTimeCeil value={value} />;
        }

        if (column.type === "BOOLEAN") {
          return value ? "Да" : "Нет";
        }

        return value;
      },
    };
  });

  const systemColumns: ColumnType<T>[] = [
    {
      title: "Действие",
      align: "center",
      render: (_, record) => {
        return (
          <EditButton
            boItem={record as unknown as IBusinessObject}
            entityFields={columnsFields}
            entityId={columnsFields[0]?.entityId}
          />
        );
      },
    },
  ];

  return baseColumns.concat(generatedColumns, systemColumns);
};
