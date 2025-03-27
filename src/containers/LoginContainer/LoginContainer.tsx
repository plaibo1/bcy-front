import { App, Button, Flex, Form, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { useLazyGetRegionsQuery } from "../../store/api/rdmApi";

export const LoginContainer = () => {
  const { notification } = App.useApp();
  const [refetchWithAuth] = useLazyGetRegionsQuery();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = searchParams.get("redirect");

  const onFinish = (values: { login: string; password: string }) => {
    const basicAuth = "Basic " + btoa(values.login + ":" + values.password);
    localStorage.setItem("token", basicAuth);

    refetchWithAuth()
      .unwrap()
      .then(() => {
        if (redirectUrl) {
          navigate(decodeURIComponent(redirectUrl));

          return;
        }

        navigate("/");
      })
      .catch(() => {
        notification.error({
          message: "Ошибка",
          description: "Не удалось войти в систему",
        });
      });
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Form layout="vertical" size="large" onFinish={onFinish}>
        <Form.Item label="Логин" name="login" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Пароль" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
