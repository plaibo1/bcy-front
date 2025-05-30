import { App, Flex, Select } from "antd";
import { type AutoCompleteProps } from "antd/lib";
import { useState } from "react";

import { UserOutlined } from "@ant-design/icons";

import { useLazyGetClientsQuery } from "../../store/api/clientsApi";
import { IClient } from "../../types/api/clientsType";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { debounce } from "../../utils/debounce";

import styles from "./SearchClient.module.css";

const transformResponseToOptions = (data: IClient[]) => {
  return data.map((client) => {
    const { id, email, firstName, lastName, middleName } = client;
    return {
      value: id,
      label: (
        <Flex gap={16}>
          <UserOutlined />

          <div>
            <span style={{ textTransform: "capitalize" }}>
              {`${firstName} ${lastName} ${middleName || ""}`}
            </span>

            <br />

            <code style={{ fontWeight: "bold" }}>{email}</code>
          </div>
        </Flex>
      ),
    };
  });
};

export const SearchClient = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) => {
  const { message } = App.useApp();
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [getClients, { isLoading }] = useLazyGetClientsQuery();

  const handleSearch = async (value: string) => {
    if (!value || value.trim() === "") {
      return;
    }

    try {
      const { data } = await getClients({
        paging: { currentPage: 0, recordsOnPage: 100 },
        filters: [
          // TODO: update IFilter types
          {
            operation: "or",
            values: [
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              {
                field: "lastName",
                operation: "starts with",
                values: [capitalizeFirstLetter(value)],
              },
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              {
                field: "firstName",
                operation: "starts with",
                values: [capitalizeFirstLetter(value)],
              },
            ],
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
      placeholder="Начните вводить фамилию"
      filterOption={false}
      onClear={() => setOptions([])}
      className={styles.select}
      loading={isLoading}
    />
  );
};
