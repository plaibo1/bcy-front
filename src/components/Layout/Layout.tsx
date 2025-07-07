import { type ReactNode } from "react";
import { Layout as AntdLayout, Menu, theme } from "antd";
import { NavLink, Outlet, useLocation } from "react-router";

const { Header, Content, Footer } = AntdLayout;

const menuItems = [
  {
    label: "Лиды",
    path: "/",
  },
  {
    label: "Клиенты",
    path: "/clients",
  },
  {
    label: "Заказы",
    path: "/orders",
  },
  {
    label: "Интеграции",
    path: "/active-backdoors",
  },
  {
    label: "Бекдоры лидов",
    path: "/backdoor-leads",
  },
  {
    label: "IVR",
    path: "/ivr",
  },
  {
    label: "Лэндинг лиды",
    path: "/landing-leads",
  },
];

const navItems = menuItems.map((item) => ({
  key: item.path,
  label: <NavLink to={item.path}>{item.label}</NavLink>,
}));

export const Layout = ({ children }: { children?: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { pathname } = useLocation();

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
          items={navItems}
          selectedKeys={[pathname]}
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
          {children || <Outlet />}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()}
      </Footer>
    </AntdLayout>
  );
};
