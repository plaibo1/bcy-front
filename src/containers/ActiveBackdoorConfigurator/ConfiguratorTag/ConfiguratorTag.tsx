import { Divider, Tag, theme, Typography } from "antd";
import { IConfigurationItem } from "../../../types/api/configuratorBackdoor";

export const ConfiguratorTag = ({
  keyName,
  item,
  active,
  onAdd,
  onRemove,
}: {
  keyName: string;
  item: IConfigurationItem;
  active: boolean;
  onAdd: (key: string, configItem: IConfigurationItem) => void;
  onRemove: (key: string) => void;
}) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { title } = item;

  const handleClick = () => {
    if (active) {
      onRemove(keyName);
      return;
    }

    onAdd(keyName, item);
  };

  return (
    <Tag
      color={active ? "blue" : "default"}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Typography.Text style={{ color: colorPrimary }}>
        {keyName}
      </Typography.Text>

      <Divider type="vertical" />

      <Typography.Text>{title}</Typography.Text>
    </Tag>
  );
};
