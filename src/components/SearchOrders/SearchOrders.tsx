import { App, Flex, Select, type SelectProps, Tag } from "antd";
import { type AutoCompleteProps } from "antd/lib";
import { useState } from "react";

import { UserOutlined } from "@ant-design/icons";

import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { debounce } from "../../utils/debounce";

import { useLazyGetOrdersQuery } from "../../store/api/orderApi";
import { IOrder } from "../../types/api/ordersType";
import { ordersStatuses } from "../../consts";

import styles from "./SearchOrders.module.css";

const transformResponseToOptions = (data: IOrder[]) => {
  return data.map((order) => {
    const { id, name, status } = order;

    return {
      value: id,
      label: (
        <Flex gap={16}>
          <UserOutlined />

          <div>
            <span style={{ textTransform: "capitalize" }}>{name}</span>

            <Tag
              style={{ marginLeft: 12 }}
              color={ordersStatuses[status].color}
            >
              {ordersStatuses[status].label}
            </Tag>

            <br />

            <code style={{ fontWeight: "bold", fontSize: 12 }}>{id}</code>
          </div>
        </Flex>
      ),
    };
  });
};

export const SearchOrders = ({
  value,
  onChange,
  selectProps,
}: {
  value?: string;
  onChange?: (v: string) => void;
  selectProps?: SelectProps;
}) => {
  const { message } = App.useApp();
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [getOrders, { isLoading }] = useLazyGetOrdersQuery();

  const handleSearch = async (value: string) => {
    if (!value || value.trim() === "") {
      return;
    }

    try {
      const { data } = await getOrders({
        paging: { currentPage: 0, recordsOnPage: 100 },
        filters: [
          {
            field: "name",
            operation: "starts with",
            values: [capitalizeFirstLetter(value)],
          },
        ],
      }).unwrap();

      setOptions(value ? transformResponseToOptions(data) : []);
    } catch {
      message.error("Произошла ошибка при поиске клиента");
    }
  };

  return (
    <Select
      mode="multiple"
      maxCount={1}
      showSearch
      options={options}
      onChange={onChange}
      value={value}
      onSearch={debounce(handleSearch, 350)}
      placeholder="Начните вводить имя заказа"
      filterOption={false}
      onClear={() => setOptions([])}
      className={styles.select}
      loading={isLoading}
      {...selectProps}
    />
  );
};
