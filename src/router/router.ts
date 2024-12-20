import { createBrowserRouter } from "react-router";
import App from "../App";
import { LeadPage } from "../pages/LeadPage";
import { ClientsPage } from "../pages/ClientsPage";
import { ActiveBackdoorPage } from "../pages/ActiveBackdoorPage";
import { BackdoorLeadPage } from "../pages/BackdoorLeadPage";

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
        path: "/active-backdoors",
        Component: ActiveBackdoorPage,
      },
      {
        path: "/backdoor-leads",
        Component: BackdoorLeadPage,
      },
    ],
  },
]);
