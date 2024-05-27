import Admin from "./pages/Admin";
import {ADMIN_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ALLPRODUCTS_ROUTE, BASKET_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import AllProducts from "./pages/AllProducts";
import Basket from "./pages/Basket";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]

export const publicRoutes = [
    {
        path: ALLPRODUCTS_ROUTE,
        Component: AllProducts
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
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
]
