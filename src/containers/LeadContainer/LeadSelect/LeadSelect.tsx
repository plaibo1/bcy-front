import { Flex, Select } from "antd";
import { useGetEntitiesQuery } from "../../../store/api/entityApi";
import { IEntity } from "../../../types/api/entityTypes";

const transformEntities = (entities: IEntity[]) => {
  if (entities.length === 0) return [];

  return entities.map((entity) => ({
    value: entity.id,
    label: entity.label,
  }));
};

interface IProps {
  onChange: (entityId: string) => void;
}

export const LeadSelect = ({ onChange }: IProps) => {
  const { data: entities, isLoading } = useGetEntitiesQuery();

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
