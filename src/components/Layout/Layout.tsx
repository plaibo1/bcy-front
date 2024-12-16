import { type ReactNode } from "react";
import { Layout as AntdLayout, Menu, theme } from "antd";
import { useNavigate } from "react-router";

const { Header, Content, Footer } = AntdLayout;

const menuItems = [
  {
    label: "Лиды",
    path: "/",
    key: "1",
  },
  {
    label: "Клиенты",
    path: "/clients",
    key: "2",
  },
  {
    label: "Активные бекдоры",
    path: "/active-backdoors",
    key: "3",
  },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    const { path } = menuItems.find((item) => item.key === key) || {};

    if (path) {
      navigate(path);
    }
  };

  return (
    <AntdLayout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0 }}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Header>
      <Content style={{ padding: "0 48px", marginTop: 32 }}>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()}
      </Footer>
    </AntdLayout>
  );
};
