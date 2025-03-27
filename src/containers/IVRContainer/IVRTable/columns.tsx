import { type ColumnsType } from "antd/es/table";

import { IVR } from "../../../types/api/ivrTypes";
import { Table } from "antd/lib";
import { DateTimeCeil } from "../../../components/Ceils/DateTimeCeil";
import { Tag } from "antd";

const statuses: Record<string, { color: string; text: string }> = {
  NEW: { color: "geekblue", text: "Новый" },
  SENT_TO_LEAD: { color: "success", text: "Отправлен в лиды" },
};

export const columns: ColumnsType<IVR> = [
  Table.SELECTION_COLUMN,
  {
    title: "Имя",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Регион",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "Сумма",
    dataIndex: "sum",
    key: "sum",
  },
  {
    title: "Улучшен",
    dataIndex: "improved",
    key: "improved",
    render: (improved) => (improved ? "Да" : "Нет"),
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (v: string) => {
      return (
        <Tag color={statuses[v]?.color || "default"}>
          {statuses[v]?.text || v}
        </Tag>
      );
    },
  },
  {
    title: "Комментарий",
    dataIndex: "transcription",
    key: "transcription",
    render: (v) => {
      if (!v) return null;

      return (
        <div
          style={{
            maxWidth: 800,
            height: 50,
            overflow: "auto",
          }}
        >
          {Object.entries(v).map(([k, v], index) => (
            <div key={index}>
              <strong>{k}</strong>: {v as string}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    title: "Ссылка на разговор",
    dataIndex: "talkLink",
    key: "talkLink",
    render: (talkLink) => (
      <a href={talkLink} target="_blank" rel="noreferrer">
        {talkLink}
      </a>
    ),
  },
  {
    title: "Дата создания",
    render: (_, record) => {
      return <DateTimeCeil value={record.audit.createdDate} />;
    },
  },
  {
    title: "Дата обновления",
    render: (_, record) => {
      return <DateTimeCeil value={record.audit.updatedDate} />;
    },
  },
];
