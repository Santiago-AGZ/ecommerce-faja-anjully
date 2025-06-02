import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import {
	HomePage,
	AboutPage,
	LoginPage,
	RegisterPage,
    FajaPage,
    ProductsPage,
} from '../pages';

import { OrdersUserPage } from '@/pages/OrdersUserPage';
import { ClientLayout } from '@/layouts/ClientLayout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'productos',
				element: <ProductsPage/>,
			},
			{
				path: 'productos/:slug',
				element: <FajaPage />,
			},
			{
				path: 'sobre-nosotros',
				element: <AboutPage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'registro',
				element: <RegisterPage />,
			},
			{
				path: 'account',
				element: <ClientLayout />,
				children: [
					{
						path: '',
						element: <Navigate to='/account/pedidos' />,
					},
					{
						path: 'pedidos',
						element: <OrdersUserPage />,
					},
				],
			},
		],
	},
]);