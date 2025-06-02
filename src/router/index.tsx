import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { AboutPage, FajaPage, HomePage, LoginPage, RegisterPage, ProductsPage } from "../pages";

export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <div> <HomePage/> </div>,
            },
            {
                path: "productos",
                element: <div><ProductsPage/> </div>,
                
            },
            {
                path: "productos/:slug",
                element: <div><FajaPage/> </div>,
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

