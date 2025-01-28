import { Select } from "antd";
import { useGetRegionsQuery } from "../../store/api/rdmApi";

export const RegionSelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) => {
  const { data, isLoading } = useGetRegionsQuery();

  return (
    <Select showSearch loading={isLoading} onChange={onChange} value={value}>
      {data?.map((region) => (
        <Select.Option key={region} value={region}>
          {region}
        </Select.Option>
      ))}
    </Select>
  );
};
