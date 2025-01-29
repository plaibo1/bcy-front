import { useParams } from "react-router";

import { useGetActiveBackdoorsQuery } from "../store/api/activeBackdoorsApi";
import { Flex, Spin } from "antd";
import { ActiveBackdoorConfigurator } from "../containers/ActiveBackdoorConfigurator";

export const ActiveBackdoorConfiguratorPage = () => {
  const { id } = useParams();
  const { isLoading, data: activeBackdoors } = useGetActiveBackdoorsQuery(
    undefined,
    { skip: !id }
  );

  const currentActiveBackdoor = activeBackdoors?.find(
    (backdoor) => backdoor.id === id
  );

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: 350 }}>
        <Spin />
      </Flex>
    );
  }

  if (!id || !currentActiveBackdoor) {
    return <div>{id} - не найдено</div>;
  }

  return <ActiveBackdoorConfigurator backdoor={currentActiveBackdoor} />;
};
