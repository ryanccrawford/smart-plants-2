/*
 * Main dashboard theme originally Designed by Creative Tim
 * 
 * This is the main dashboard routes data, icons and header names: could come from a database once in production
 * Smart Plants 2 - React Dashboard
 * Author: Ryan Crawford
 * 
 * 
*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import History from "views/History/History.js";
import PlantSetup from "views/PlantSetup/PlantSetup.js";
import Devices from "views/Devices/Devices.js";
import Maps from "views/Maps/Maps.js";
import Support from "views/Support/Support.js";


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
        icon: "person",
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
