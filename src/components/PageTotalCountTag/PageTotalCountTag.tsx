import { Spin, Tag } from "antd";
import { TagProps } from "antd/lib";

export const PageTotalCountTag = ({
  count,
  isLoading,
  wrapperStyles,
  tagProps,
}: {
  count?: number;
  isLoading?: boolean;
  wrapperStyles?: React.CSSProperties;
  tagProps?: TagProps;
}) => {
  return (
    <div style={{ marginBottom: 8, ...wrapperStyles }}>
      <Tag color="geekblue" {...tagProps}>
        {isLoading ? (
          <Spin size="small" />
        ) : (
          <>
            Найдено значений: <strong>{count}</strong>
          </>
        )}
      </Tag>
    </div>
  );
};
