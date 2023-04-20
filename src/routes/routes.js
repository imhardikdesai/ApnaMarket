import { useRoutes, Navigate } from "react-router-dom";
import DashboardLayout from '../layouts/dashboard/';
import SimpleLayout from './../layouts/simple';
// import BlogPage from './../pages/BlogPage';
import UserPage from './../pages/UserPage';
import LoginPage from './../pages/LoginPage';
import Page404 from './../pages/Page404';
import ProductsPage from './../pages/ProductsPage';
import DashboardAppPage from '../pages/DashboardAppPage';
import PrivateRoute from "./PrivateRoute";
import CartPage from "../pages/CartPage";
// import { useSelector } from "react-redux";

export default function Router() {
    // const isAdmin = false
    // const isAdmin = useSelector(state => state.auth.isAdmin)
    const routes = useRoutes([
        {
            path: '/',
            element: <Navigate to='/login' />,
        },
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/products" />, index: true },
                { path: 'app', element: <PrivateRoute admin={true} element={<DashboardAppPage />} /> },
                { path: 'user', element: <PrivateRoute admin={true} element={<UserPage />} /> },
                { path: 'products', element: <PrivateRoute admin={false} element={<ProductsPage />} /> },
                { path: 'cart', element: <PrivateRoute admin={false} element={<CartPage />} /> },
                { path: 'profile', element: <PrivateRoute admin={false} element={<Page404 />} /> },
                { path: 'setting', element: <PrivateRoute admin={false} element={<Page404 />} /> },
            ],
        },
        {
            path: 'cart',
            element: <PrivateRoute admin={false} element={<CartPage />} />,
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            element: <SimpleLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
