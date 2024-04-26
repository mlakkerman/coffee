import Admin from "./pages/Admin";
import {ADMIN_ROUTE, EVENT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ALLEVENTS_ROUTE} from "./utils/consts";
import AllEvents from "./pages/AllEvents";
import Auth from "./pages/Auth";
import EventsPage from "./pages/EventsPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: ALLEVENTS_ROUTE,
        Component: AllEvents
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: EVENT_ROUTE + '/:id',
        Component: EventsPage
    },
]
