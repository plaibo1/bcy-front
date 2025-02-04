import { PresetStatusColorType } from "antd/es/_util/colors";
import { EntityType } from "../types/api/entityFieldsTypes";

export const BASE_URL = "https://api.crm.makeitdeal.ru";
// "https://api.crm.makeitdeal.ru";
// || import.meta.env.VITE_BASE_URL || "/api";

export const ACTIVE_BACKDOOR_URL_POSTFIX = "crm.lead.fields";

export const ENTITY_FIELD_TYPES_MAP: Record<
  EntityType,
  { label: string; value: EntityType }
> = {
  BOOLEAN: {
    label: "Логический",
    value: "BOOLEAN",
  },
  DATE: {
    label: "Дата",
    value: "DATE",
  },
  DATETIME: {
    label: "Дата и время",
    value: "DATETIME",
  },
  STRING: {
    label: "Строка",
    value: "STRING",
  },
  TEXTAREA: {
    label: "Текст",
    value: "TEXTAREA",
  },
  NUMBER: {
    label: "Число",
    value: "NUMBER",
  },

  EMAIL: {
    label: "Email",
    value: "EMAIL",
  },
  PHONE: {
    label: "Телефон",
    value: "PHONE",
  },
};

export const sourceTypeMap: Record<string, string> = {
  FRONT: "Админ панель",
  BACKDOOR: "Бэкдор",
  IVR: "Контакт-центр",
};

export const ordersStatuses: Record<
  string,
  { label: string; color: PresetStatusColorType }
> = {
  IN_PROGRESS: {
    label: "В работе",
    color: "processing",
  },
  PAUSE: {
    label: "Пауза",
    color: "warning",
  },
  EXECUTED: {
    label: "Выполнен",
    color: "success",
  },
};
