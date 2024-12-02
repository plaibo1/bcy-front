import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const DateTimeCeil = ({ value }: { value?: string }) => {
  if (!value || value.trim() === "" || typeof value !== "string") return null;

  const [date, time] = dayjs(value).format("DD.MM.YYYY HH:mm:ss").split(" ");

  return (
    <div>
      <div>
        <ClockCircleOutlined /> {date}
      </div>
      <div>
        <CalendarOutlined /> {time}
      </div>
    </div>
  );
};
