import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App';
import { lazy } from 'react';
const Homepage = lazy(() => import('./pages/Homepage/Homepage'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Homepage />,
			},
		],
	},
]);
