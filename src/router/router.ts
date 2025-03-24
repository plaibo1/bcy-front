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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
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
]);
