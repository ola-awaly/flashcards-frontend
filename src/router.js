import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App';
import { lazy } from 'react';
import { rootLaoder } from './loaders/rootLoader';
import { gestionFlashcardsLoader } from './loaders/gestionFlashcardsLoader';
import Error from './pages/Error/Error';
import { matiereNewLoader } from './loaders/matiereNewLoader';
import { matiereEditLoader } from './loaders/matiereEditLoader';
const Homepage = lazy(() => import('./pages/Homepage/Homepage'));
const Inscription = lazy(() => import('./pages/Inscription/Inscription'));
const Login = lazy(() => import('./pages/Login/Login'));
const GestionFlashcards = lazy(() =>
	import('./pages/GestionFlashcards/GestionFlashcards')
);
const ChapitresParMatiere = lazy(() =>
	import(
		'./pages/GestionFlashcards/Chapitres/ChapitresParMatiere/ChapitresParMatiere'
	)
);
const MatiereEdit = lazy(() =>
	import('./pages/GestionFlashcards/Matieres/MatiereEdit/MatiereEdit')
);
export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		loader: rootLaoder,
		errorElement: <Error />,
		children: [
			{
				index: true,
				errorElement: <Error />,
				element: <Homepage />,
			},
			{
				path: 'inscription',
				errorElement: <Error />,
				element: <Inscription />,
			},
			{
				path: 'login',
				errorElement: <Error />,
				element: <Login />,
			},
			{
				path: 'myflashcards/:userid',
				element: <GestionFlashcards />,
				errorElement: <Error />,
				loader: async ({ params }) =>
					await gestionFlashcardsLoader(params.userid),
				children: [],
			},
			{
				path: '/matiere/:matiereid/chapitres',
				element: <ChapitresParMatiere />,
			},
			{
				path: '/matiere/:matiereid/edit',
				loader: ({ params }) => matiereEditLoader(params.matiereid),
				element: <MatiereEdit />,
			},
			{
				path: '/matiere/new',
				loader: matiereNewLoader,
				element: <MatiereEdit />,
			},
		],
	},
]);
