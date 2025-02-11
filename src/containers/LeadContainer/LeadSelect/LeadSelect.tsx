import { Flex, Select } from "antd";
import { useGetEntitiesQuery } from "../../../store/api/entityApi";
import { IEntity } from "../../../types/api/entityTypes";
// import { useEffect } from "react";

const transformEntities = (entities: IEntity[]) => {
  if (entities.length === 0) return [];

  return entities.map((entity) => ({
    value: entity.id,
    label: entity.label,
  }));
};

interface IProps {
  onChange: (entityId: string) => void;
  selectFirst?: boolean;
}

export const LeadSelect = ({ onChange, selectFirst }: IProps) => {
  console.log("🚀 ~ LeadSelect ~ selectFirst:", selectFirst);
  const { data: entities, isLoading } = useGetEntitiesQuery();

  // useEffect(() => {
  //   if (selectFirst && !isLoading && entities?.[0]?.id) {
  //     // onChange(entities?.[0]?.id || "");
  //   }
  // }, [entities, isLoading, onChange, selectFirst]);

  return (
    <Flex vertical gap={8}>
      <Select
        size="large"
        showSearch
        style={{ width: 300 }}
        placeholder="Выбор категории"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onChange={onChange}
        loading={isLoading}
        options={transformEntities(entities ?? [])}
      />
    </Flex>
  );
};
