import { Button, Flex, Spin, Typography } from "antd";
import { IActiveBackdoor } from "../../types/api/activeBackdoorsTypes";
import { ConfiguratorHeading } from "./ConfiguratorHeading/ConfiguratorHeading";
import { useGetConfigurationsQuery } from "../../store/api/configuratorBackdoorApi";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate, useParams } from "react-router";
import { LeftOutlined } from "@ant-design/icons";

export const ActiveBackdoorConfigurator = ({
  backdoor,
}: {
  backdoor: IActiveBackdoor;
}) => {
  const navigate = useNavigate();
  const { configurationId } = useParams();
  const { data, isLoading } = useGetConfigurationsQuery({
    filters: [
      { field: "backdoorId", operation: "equal", values: [backdoor.id] },
    ],
  });

  return (
    <div>
      <Button
        onClick={() => navigate("/active-backdoors")}
        icon={<LeftOutlined />}
      >
        Назад
      </Button>

      <Typography.Title level={1}>Конфигурации бэкдора</Typography.Title>

      <ConfiguratorHeading backdoor={backdoor} />

      {isLoading && (
        <Flex justify="center" align="center" style={{ height: 350 }}>
          <Spin />
        </Flex>
      )}

      {!isLoading && (
        <Flex align="stretch" gap={16} style={{ marginBottom: 24 }}>
          <Link to={`/active-backdoors/${backdoor.id}/new`}>
            <Button
              type={configurationId === "new" ? "primary" : "default"}
              size="large"
              icon={<PlusOutlined />}
            >
              {configurationId === "new"
                ? "Добавление конфигурации"
                : "Добавить конфигурацию"}
            </Button>
          </Link>

          {data?.data.map(({ id, order }) => {
            return (
              <Link key={id} to={`/active-backdoors/${backdoor.id}/${id}`}>
                <Button
                  type={configurationId === id ? "primary" : "default"}
                  icon={<SettingOutlined />}
                  size="large"
                >
                  {order.name}
                </Button>
              </Link>
            );
          })}
        </Flex>
      )}

      <Outlet context={{ backdoor } satisfies { backdoor: IActiveBackdoor }} />
    </div>
  );
};
