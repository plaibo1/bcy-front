import { Button, Flex, Popover, Tag } from "antd";
import dayjs from "dayjs";
import { getShortText } from "../../utils/getShortText";
import { useState } from "react";

import { DownOutlined, UpOutlined } from "@ant-design/icons";

export const AuditCeil = ({ record }: { record?: Record<string, string> }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Flex
      gap={8}
      style={{
        fontSize: 12,
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div>
        Создано:{" "}
        <Tag style={{ fontSize: 12 }} color="geekblue">
          {record?.createdDate
            ? dayjs(record.createdDate).format("DD.MM.YYYY HH:mm:ss")
            : ""}
        </Tag>
      </div>
      {showAll && (
        <>
          <div>
            Создал:{" "}
            <Popover content={"id: " + record?.createdBy}>
              <Tag style={{ fontSize: 12 }} color="geekblue">
                {getShortText({ text: record?.createdBy ?? "" })}
              </Tag>
            </Popover>
          </div>
          <div>
            Обновлено:{" "}
            <Tag style={{ fontSize: 12 }} color="geekblue">
              {record?.updatedDate
                ? dayjs(record.updatedDate).format("DD.MM.YYYY HH:mm:ss")
                : ""}
            </Tag>
          </div>
          <div>
            Обновил:{" "}
            <Popover content={"id: " + record?.updatedBy}>
              <Tag style={{ fontSize: 12 }} color="geekblue">
                {getShortText({ text: record?.updatedBy ?? "" })}
              </Tag>
            </Popover>
          </div>
        </>
      )}

      <Button
        size="small"
        style={{ fontSize: 12, display: "inline-flex" }}
        onClick={() => setShowAll((p) => !p)}
        type="link"
        icon={showAll ? <UpOutlined /> : <DownOutlined />}
        iconPosition="end"
      >
        {showAll ? "Скрыть" : "Еще"}
      </Button>
    </Flex>
  );
};
