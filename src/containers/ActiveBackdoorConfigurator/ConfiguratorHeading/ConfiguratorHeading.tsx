import { Avatar, Flex, Typography } from "antd";
import { IActiveBackdoor } from "../../../types/api/activeBackdoorsTypes";
import { ACTIVE_BACKDOOR_URL_POSTFIX } from "../../../consts";
import { UserOutlined, LinkOutlined, MailOutlined } from "@ant-design/icons";

export const ConfiguratorHeading = ({
  backdoor,
}: {
  backdoor: IActiveBackdoor;
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Flex style={{ marginBottom: 8 }} align="center" gap={8}>
        <Avatar icon={<UserOutlined />} />
        <Typography.Title style={{ margin: 0 }} level={3}>
          {backdoor?.client?.lastName} {backdoor?.client?.firstName}{" "}
          {backdoor?.client?.middleName}
        </Typography.Title>
      </Flex>
      <Flex gap={4}>
        <LinkOutlined />
        {backdoor.url}/{ACTIVE_BACKDOOR_URL_POSTFIX}
      </Flex>
      <Flex gap={4}>
        <MailOutlined />
        {backdoor?.client?.email}
      </Flex>
    </div>
  );
};
