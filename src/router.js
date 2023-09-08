import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App';
import { lazy } from 'react';
import { rootLaoder } from './loaders/rootLoader';
import { logout } from './apis/security';
const Homepage = lazy(() => import('./pages/Homepage/Homepage'));
const Inscription = lazy(() => import('./pages/Inscription/Inscription'));
const Login = lazy(() => import('./pages/Login/Login'));
export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		loader: rootLaoder,
		children: [
			{
				index: true,
				element: <Homepage />,
			},
			{
				path: 'inscription',
				element: <Inscription />,
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);
