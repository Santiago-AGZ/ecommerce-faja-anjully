import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { AboutPage, LoginPage, RegisterPage } from "../pages";

export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <div> INCIO </div>,
            },
            {
                path: "productos",
                element: <div> Fajas </div>,
            },
            {
                path: "sobre-nosotros",
                element: <div><AboutPage/></div>,
            },
            {
                path: "login",
                element: <LoginPage/>,
            },
            {
                path: "register",
                element:<RegisterPage/>,
            },
        ],
    },
]);

