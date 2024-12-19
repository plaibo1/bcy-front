import { Button, Space } from "antd";
import {
  useGetActiveBackdoorsQuery,
  useRefreshActiveBackdoorMutation,
} from "../../store/api/activeBackdoorsApi";
import { CreateActiveBackdoor } from "./CreateActiveBackdoor";
import { ActiveBackdoorTable } from "./ActiveBackdoorTable";
import { ReloadOutlined } from "@ant-design/icons";

export const ActiveBackdoor = () => {
  const { data, isLoading, isFetching } = useGetActiveBackdoorsQuery();
  const [refreshActiveBackdoor] = useRefreshActiveBackdoorMutation();

  return (
    <>
      <Space style={{ marginBottom: 32 }}>
        <CreateActiveBackdoor />

        <Button
          icon={<ReloadOutlined />}
          size="large"
          onClick={() => refreshActiveBackdoor()}
        >
          Сбросить неактивные
        </Button>
      </Space>

      <ActiveBackdoorTable data={data} isLoading={isLoading || isFetching} />
    </>
  );
};
