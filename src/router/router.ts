import { createBrowserRouter } from "react-router";
import App from "../App";
import { LeadPage } from "../pages/LeadPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: LeadPage,
      },
    ],
  },
]);
