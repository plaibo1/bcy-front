import { Button, theme } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { type ReactNode, useState } from "react";
import { ButtonProps } from "antd/lib";

export const FiltersButton = ({
  children,
  buttonStyles,
  buttonProps,
}: {
  children: ReactNode;
  buttonStyles?: React.CSSProperties;
  buttonProps?: ButtonProps;
}) => {
  const {
    token: { borderRadiusLG, colorBorder },
  } = theme.useToken();

  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Button
        style={{
          marginBottom: 24,
          ...(buttonStyles ? { ...buttonStyles } : {}),
        }}
        onClick={() => setShowFilters(!showFilters)}
        icon={<FilterOutlined />}
        type={showFilters ? "primary" : "default"}
        {...buttonProps}
      >
        {showFilters ? "Скрыть" : "Показать"} фильтры
      </Button>

      {showFilters && (
        <div
          style={{
            border: `1px solid ${colorBorder}`,
            padding: 16,
            borderRadius: borderRadiusLG,
            marginBottom: 32,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};
