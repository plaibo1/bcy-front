import { createBrowserRouter } from "react-router";
import App from "../App";
import { LeadPage } from "../pages/LeadPage";
import { ClientsPage } from "../pages/ClientsPage";
import { ActiveBackdoorPage } from "../pages/ActiveBackdoorPage";
import { BackdoorLeadPage } from "../pages/BackdoorLeadPage";
import { OrdersPage } from "../pages/OrdersPage";
import { ActiveBackdoorConfiguratorPage } from "../pages/ActiveBackdoorConfiguratorPage";
import { ConfiguratorSubPage } from "../containers/ActiveBackdoorConfigurator/Configurator";
import { IVRPage } from "../pages/IVRPage";
import { LoginPage } from "../pages/LoginPage";
import { EmptyLayout } from "../components/Layout/EmptyLayout";
import { Layout } from "../components/Layout";
import { AuthGuard } from "./AuthGuard";
import { OrdersSendingResultsPage } from "../pages/OrdersSendingResultsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: EmptyLayout,
        children: [
          {
            path: "/login",
            Component: LoginPage,
          },
        ],
      },
      {
        element: (
          <AuthGuard>
            <Layout />
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            Component: LeadPage,
          },
          {
            path: "/clients",
            Component: ClientsPage,
          },
          {
            path: "/orders",
            Component: OrdersPage,
          },
          {
            path: "/orders/:orderId",
            Component: OrdersSendingResultsPage,
          },
          {
            path: "/active-backdoors",
            Component: ActiveBackdoorPage,
          },
          {
            path: "/active-backdoors/:id",
            Component: ActiveBackdoorConfiguratorPage,
            children: [
              {
                path: ":configurationId",
                Component: ConfiguratorSubPage,
              },
            ],
          },
          {
            path: "/backdoor-leads",
            Component: BackdoorLeadPage,
          },
          {
            path: "/ivr",
            Component: IVRPage,
          },
        ],
      },
    ],
  },
]);
