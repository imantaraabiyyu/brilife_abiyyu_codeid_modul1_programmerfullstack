import { HomePage } from "../scenes/home";
import { ProvincesPage, ProvincePage } from "../scenes/provinces";
import {
  ContraceptionUsersPage,
  ContraceptionUserPage
} from "../scenes/contraceptin_users";
import { ContraceptionsPage, ContraceptionPage } from "../scenes/contraception";
import { ErrorPage } from "../scenes/error";

const routes = [
  {
    path: "/",
    breadcrumb: "Home",
    component: HomePage,
    exact: true
  },
  {
    path: "/provinces/add",
    breadcrumb: "Add Province",
    component: ProvincePage
  },
  {
    path: "/provinces/:id",
    breadcrumb: "Detail",
    component: ProvincePage
  },
  {
    path: "/provinces",
    breadcrumb: "Provinces",
    component: ProvincesPage
  },
  {
    path: "/contraception-users/add",
    breadcrumb: "Add ContraceptionUser",
    component: ContraceptionUserPage
  },
  {
    path: "/contraception-users/:id",
    breadcrumb: "Detail",
    component: ContraceptionUserPage
  },
  {
    path: "/contraception-users",
    breadcrumb: "ContraceptionUsers",
    component: ContraceptionUsersPage
  },
  {
    path: "/contraceptions/add",
    breadcrumb: "Add Contraception",
    component: ContraceptionPage
  },
  {
    path: "/contraceptions/:id",
    breadcrumb: "Detail",
    component: ContraceptionPage
  },
  {
    path: "/contraceptions",
    breadcrumb: "Contraceptions",
    component: ContraceptionsPage
  },
  {
    path: "*",
    component: ErrorPage,
    props: {
      code: 404
    }
  }
];

export default routes;
