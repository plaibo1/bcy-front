import { Button, Space } from "antd";
import { useRefreshActiveBackdoorMutation } from "../../store/api/activeBackdoorsApi";
import { CreateActiveBackdoor } from "./CreateActiveBackdoor";

export const ActiveBackdoor = () => {
  const [refreshActiveBackdoor] = useRefreshActiveBackdoorMutation();

  return (
    <Space>
      <CreateActiveBackdoor />

      <Button size="large" onClick={() => refreshActiveBackdoor()}>
        Обновить
      </Button>
    </Space>
  );
};
