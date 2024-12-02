import { type ReactNode } from "react";
import { Layout as AntdLayout, Menu, theme } from "antd";

const { Header, Content, Footer } = AntdLayout;

const items = [
  {
    label: "nav 1",
    key: "1",
  },
  {
    label: "nav 2",
    key: "2",
  },
  {
    label: "nav 3",
    key: "3",
  },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          items={items}
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
