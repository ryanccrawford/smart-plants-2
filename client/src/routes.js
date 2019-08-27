/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import History from "views/TableList/TableList.js";
import PlantSetup from "./components/PlantSetup";
import Devices from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import Support from "views/Notifications/Notifications.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "dashboard",
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/history",
    name: "History",
    icon: "bar_chart",
    component: History,
    layout: "/admin"
  },
  {
    path: "/plants",
    name: "Plants",
    icon: "local_florist",
    component: PlantSetup,
    layout: "/admin"
  },
  {
    path: "/devices",
    name: "Devices",
    icon: "settings_remote",
    component: Devices,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Geographic Data",
    icon: "terrain",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/support",
    name: "Support",
    icon: "question_answer",
    component: Support,
    layout: "/admin"
  }


];

export default dashboardRoutes;
