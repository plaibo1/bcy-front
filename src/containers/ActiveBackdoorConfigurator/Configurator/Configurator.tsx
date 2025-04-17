import {
  Alert,
  App,
  Button,
  Divider,
  Flex,
  Form,
  Popconfirm,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { ConfiguratorTag } from "../ConfiguratorTag/ConfiguratorTag";
import { ConfiguratorForm } from "../ConfiguratorForm";
import { IConfigurationItem } from "../../../types/api/configuratorBackdoor";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import {
  useCreateConfigurationMutation,
  useDeleteConfigurationMutation,
  useGetConfigurationsQuery,
  useGetWebhookConfigurationsQuery,
  useGetWebhookSourceQuery,
  useUpdateConfigurationMutation,
} from "../../../store/api/configuratorBackdoorApi";
import { SearchOrders } from "../../../components/SearchOrders";
import { IOrder } from "../../../types/api/ordersType";
import { UserOutlined } from "@ant-design/icons";
import { isBackendError } from "../../../types/errorTypeGuards";
import { IActiveBackdoor } from "../../../types/api/activeBackdoorsTypes";
import { ACTIVE_BACKDOOR_URL_POSTFIX } from "../../../consts";

const getInitConfig = ({
  configurationItems,
  items,
}: {
  isNew?: boolean;
  configurationItems?: Record<string, IConfigurationItem>;
  items?: Record<string, string>;
}): Record<string, IConfigurationItem> => {
  if (!configurationItems || !items) {
    return {};
  }

  return Object.keys(items ?? {}).reduce((acc, key) => {
    acc[key] = configurationItems[key];
    return acc;
  }, {} as Record<string, IConfigurationItem>);
};

const Sources = ({ url, addSourceId }: { url?: string; addSourceId: (id: string) => void }) => {
  const { data, isLoading, isError } = useGetWebhookSourceQuery(
    {
      url: url || "",
    },
    {
      skip: !url,
    }
  );

  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Spin />
      </Flex>
    );
  }


  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        overflow: "auto",
        border: "1px solid #ccc",
        borderRadius: 20,
        padding: 8,
        maxHeight: 500,
      }}
    >
      {data?.result?.map((item, index) => (
        <Tag key={index} onClick={() => addSourceId(item.STATUS_ID)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <Typography.Text>
            <strong>{item.NAME}</strong>
          </Typography.Text>

          <Divider type="vertical" />

          <div>
            <Typography.Text>{item.STATUS_ID}</Typography.Text>
          </div>
        </Tag>
      ))}
    </div>
  );
};

/**
 *
 * простите если читаете это.....
 *
 * @todo РЕФАКТОР !!!!!
 */
export const Configurator = ({
  initialConfigValues,
  configurationItems,
  isNew,
  order,
  url,
}: {
  initialConfigValues?: Record<string, string>;
  configurationItems?: Record<string, IConfigurationItem>;
  isNew?: boolean;
  order?: IOrder;
  url?: string;
}) => {
  const navigate = useNavigate();
  const { id: backdoorId, configurationId } = useParams();
  const { notification, message } = App.useApp();

  const [form] = Form.useForm()

  const { data: configurationsData } = useGetConfigurationsQuery({
    filters: [
      { field: "backdoorId", operation: "equal", values: [backdoorId || ""] },
    ],
  });

  const [updateConfiguration, { isLoading: isSaving }] =
    useUpdateConfigurationMutation();
  const [deleteConfiguration, { isLoading: isDeleting }] =
    useDeleteConfigurationMutation();
  const [createConfiguration, { isLoading: isCreating }] =
    useCreateConfigurationMutation();

  const [configItems, setConfigItems] = useState<
    Record<string, IConfigurationItem>
  >(() =>
    getInitConfig({ configurationItems, items: initialConfigValues ?? {} })
  );

  const [currentConfig, setCurrentConfig] = useState<Record<string, string>>(
    initialConfigValues ?? {}
  );

  const [orderId, setOrderId] = useState<string>();

  useEffect(() => {
    setCurrentConfig(initialConfigValues ?? {});
    setConfigItems(
      getInitConfig({ configurationItems, items: initialConfigValues ?? {} })
    );
    setCurrentConfig(initialConfigValues ?? {});
  }, [initialConfigValues, configurationItems]);

  const onRemove = (key: string) => {
    setConfigItems((prev) => {
      const newConfig = { ...prev };
      delete newConfig[key];
      return newConfig;
    });
  };

  const onAdd = (key: string, configItem: IConfigurationItem) => {
    setConfigItems((prev) => {
      const newConfig = { ...prev };
      newConfig[key] = configItem;
      return newConfig;
    });
  };

  const clearConfig = () => {
    setConfigItems({});
  };

  const onSubmit = (values: Record<string, string>) => {
    setCurrentConfig(values);
  };

  const saveChanges = () => {
    if (!configurationId) return;

    updateConfiguration({
      id: configurationId,
      data: currentConfig,
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Конфигурация успешно сохранена",
        });
      })
      .catch((err) => {
        if (isBackendError(err)) {
          notification.error({
            message: "Ошибка",
            description: err.data.message,
          });
          return;
        }

        notification.error({
          message: "Ошибка",
          description: "Ошибка сохранения конфигурации",
        });
      });
  };

  const deleteConfig = () => {
    if (!configurationId) return;

    deleteConfiguration(configurationId)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Конфигурация успешно удалена",
        });
        navigate(`/active-backdoors/${backdoorId}`);
      })
      .catch((err) => {
        if (isBackendError(err)) {
          notification.error({
            message: "Ошибка",
            description: err.data.message,
          });
          return;
        }

        notification.error({
          message: "Ошибка",
          description: "Ошибка удаления конфигурации",
        });
      });
  };

  const createConfig = () => {
    if (!orderId) {
      message.error("Выберите заказ");
      return;
    }

    if (configurationsData?.data.find(({ order }) => order.id === orderId[0])) {
      notification.error({
        message: "Выберите другой заказ",
        description: "Конфигурация для этого заказа уже существует",
      });
      return;
    }

    if (!backdoorId) return;

    createConfiguration({
      orderId: Array.isArray(orderId) ? orderId[0] : orderId,
      backdoorId,
      data: currentConfig,
    })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешно",
          description: "Конфигурация успешно создана",
        });

        navigate(`/active-backdoors/${backdoorId}`);
      })
      .catch((err) => {
        if (isBackendError(err)) {
          notification.error({
            message: "Ошибка",
            description: err.data.message,
          });
          return;
        }

        notification.error({
          message: "Ошибка",
          description: "Ошибка создания конфигурации",
        });
      });
  };

  const handleAddSourceId = (SOURCE_ID: string) => {
    setConfigItems((prev) => {
      return {
        ...prev,
        SOURCE_ID: {
          type: "string",
          isRequired: true,
          isReadOnly: true,
          isImmutable: true,
        } as IConfigurationItem
      }
    })
    form.setFieldsValue({
      SOURCE_ID
    })
  }

  return (
    <div>
      {isNew ? (
        <div style={{ marginBottom: 24 }}>
          <Typography.Title level={4}>Выберите заказ:</Typography.Title>

          <SearchOrders
            value={orderId}
            onChange={setOrderId}
            selectProps={{ style: { width: 400 }, size: "large" }}
          />
        </div>
      ) : (
        <div style={{ marginBottom: 24 }}>
          <Typography.Title level={4}>Заказ:</Typography.Title>

          <div
            style={{
              border: "1px solid #ccc",
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: 20,
            }}
          >
            <Flex gap={8}>
              <UserOutlined />
              <span style={{ textTransform: "capitalize" }}>{order?.name}</span>
            </Flex>

            <code>{order?.id}</code>
          </div>
        </div>
      )}

      <Typography.Title level={4}>
        Выберите параметры конфигурации:
      </Typography.Title>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          overflow: "auto",
          border: "1px solid #ccc",
          borderRadius: 20,
          padding: 8,
          height: 500,
          marginBottom: 24,
        }}
      >
        {Object.entries(configurationItems ?? {}).map(([key, value]) => {
          return (
            <ConfiguratorTag
              key={key}
              keyName={key}
              item={value}
              active={!!configItems[key]}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          );
        })}
      </div>

      <Sources url={url} addSourceId={handleAddSourceId} />

      {Object.keys(configItems).length > 0 && (
        <div>
          <Typography.Title level={4}>Выбранные ключи: </Typography.Title>

          <ConfiguratorForm
            configItems={configItems}
            onRemove={onRemove}
            onSubmit={onSubmit}
            onClear={clearConfig}
            initialValues={initialConfigValues}
            form={form}
          />
        </div>
      )}

      {Object.keys(currentConfig).length > 0 && (
        <>
          <Typography.Title level={4}>Результат</Typography.Title>

          <div
            style={{
              overflow: "auto",
              border: "1px solid #ccc",
              borderRadius: 20,
              padding: 8,
              paddingLeft: 24,
            }}
          >
            <pre>{JSON.stringify(currentConfig, null, 2)}</pre>
          </div>
        </>
      )}

      <div style={{ marginTop: 24 }}>
        {!isNew && Object.keys(currentConfig).length > 0 && (
          <Space>
            <Button
              size="large"
              onClick={saveChanges}
              loading={isSaving}
              disabled={isDeleting}
              type="primary"
            >
              Сохранить изменения
            </Button>

            <Popconfirm
              title="Вы уверены, что хотите удалить конфигурацию?"
              okText="Да"
              cancelText="Нет"
              onConfirm={deleteConfig}
            >
              <Button size="large" danger loading={isDeleting}>
                Удалить
              </Button>
            </Popconfirm>
          </Space>
        )}

        {isNew && Object.keys(currentConfig).length > 0 && (
          <Button
            size="large"
            type="primary"
            onClick={createConfig}
            loading={isCreating}
          >
            Создать конфигурацию
          </Button>
        )}
      </div>
    </div>
  );
};

export const ConfiguratorSubPage = () => {
  const { backdoor } = useOutletContext<{ backdoor: IActiveBackdoor }>();

  const { configurationId } = useParams();

  const { data, isLoading } = useGetConfigurationsQuery(
    {
      filters: [
        { field: "backdoorId", operation: "equal", values: [backdoor.id] },
      ],
    },
    { skip: !configurationId || configurationId === "new" || !backdoor.id }
  );

  const {
    data: webhookData,
    isLoading: isLoadingWebhook,
    isError: isErrorWebhook,
  } = useGetWebhookConfigurationsQuery({
    url: backdoor.url,
  });

  const result = data?.data?.find((item) => item.id === configurationId);

  if (isLoading || isLoadingWebhook) {
    return (
      <Flex justify="center" align="center" style={{ height: 350 }}>
        <Spin />
      </Flex>
    );
  }

  if (isErrorWebhook) {
    return (
      <Flex justify="center" align="center" style={{ height: 350 }}>
        <Alert
          showIcon
          type="error"
          message="Ошибка при загрузке конфигурации"
          description={`URL: ${backdoor.url}/${ACTIVE_BACKDOOR_URL_POSTFIX}`}
        />
      </Flex>
    );
  }

  return (
    <div>
      {result && webhookData?.result && (
        <Configurator
          order={result.order}
          initialConfigValues={result.data}
          configurationItems={webhookData.result}
          url={backdoor.url}
        />
      )}

      {!result && webhookData?.result && (
        <Configurator
          isNew
          configurationItems={webhookData.result}
          url={backdoor.url}
        />
      )}
    </div>
  );
};
