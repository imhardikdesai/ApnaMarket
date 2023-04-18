import { useRoutes, Navigate } from "react-router-dom";
import DashboardLayout from '../layouts/dashboard/';
import SimpleLayout from './../layouts/simple';
// import BlogPage from './../pages/BlogPage';
import UserPage from './../pages/UserPage';
import LoginPage from './../pages/LoginPage';
import Page404 from './../pages/Page404';
import ProductsPage from './../pages/ProductsPage';
import DashboardAppPage from '../pages/DashboardAppPage';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



const PrivateRoute = ({ element }) => {
    const { currentUser } = useContext(AuthContext)
    const loggedIn = currentUser
    return loggedIn ? element : <Navigate to="/login" />;
};


export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <Navigate to='/login' />,
        },
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: 'app', element: <PrivateRoute element={<DashboardAppPage />} /> },
                { path: 'user', element: <PrivateRoute element={<UserPage />} /> },
                { path: 'products', element: <PrivateRoute element={<ProductsPage />} /> },
                { path: 'profile', element: <PrivateRoute element={<Page404 />} /> },
                { path: 'setting', element: <PrivateRoute element={<Page404 />} /> },
            ],
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
        // {
        //     path: '*',
        //     element: <Navigate to="/404" replace />,
        // },
    ]);

    return routes;
}
