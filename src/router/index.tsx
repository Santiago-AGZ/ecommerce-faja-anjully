import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import {
	HomePage,
	AboutPage,
	LoginPage,
	RegisterPage,
    FajaPage,
    ProductsPage,
	DashboardProductsPage,
	DashboardNewProductPage,
} from '../pages';

import { OrdersUserPage } from '@/pages/OrdersUserPage';
import { ClientLayout } from '@/layouts/ClientLayout';
import { OrderUserPage } from '@/pages/OrderUserPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { ThankyouPage } from '@/pages/ThankyouPage';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardProductSlugPage } from '@/pages/dashboard/DashboardProductSlugPage';

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
					{
						path: 'pedidos/:id',
						element: <OrderUserPage />,
					},
				],
			},
		],
	},
	{
		path: '/checkout',
		element: <CheckoutPage />,
	},
	{
		path: '/checkout/:id/thank-you',
		element: <ThankyouPage />,
	},
	{
		path: '/dashboard',
		element: <DashboardLayout />,
		children: [
			{
				index: true,
				element: <Navigate to='/dashboard/productos' />,
			},
			{
				path: 'productos',
				element: <DashboardProductsPage />,
			},
			{
				path: 'productos/new',
				element: <DashboardNewProductPage />,
			},
			{
				path: 'productos/editar/:slug',
				element: <DashboardProductSlugPage />,
			},
		],
	},
]);