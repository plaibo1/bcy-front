import { DateTimeCeil } from "../../../components/Ceils/DateTimeCeil";
import { ILandingLead } from "../../../types/api/landingLeadsTypes";
import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<ILandingLead> = [
  {
    title: "Фамилия",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Отчество",
    dataIndex: "middleName",
    key: "middleName",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Паспорт",
    dataIndex: "passportSerial",
    key: "passportSerial",
    render: (passportSerial, record) =>
      `${passportSerial || ""} ${record.passportNumber || ""}`,
  },
  {
    title: "Дата создания",
    dataIndex: "audit",
    key: "audit",
    render: (audit) => <DateTimeCeil value={audit.createdDate} />,
  },
];
