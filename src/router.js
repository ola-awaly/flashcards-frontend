import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App';
import { lazy } from 'react';
import { rootLaoder } from './loaders/rootLoader';
import { gestionFlashcardsLoader } from './loaders/gestionFlashcardsLoader';
import Error from './pages/Error/Error';
import { matiereNewLoader } from './loaders/matiereNewLoader';
import { matiereEditLoader } from './loaders/matiereEditLoader';
import { chapitreParMatiereLoader } from './loaders/chapitresParMatiereLoader';
import { chapitreNewLoader } from './loaders/chapitreNewLoader';
import { chapitreEditLoader } from './loaders/chapitreEditLoader';
const Homepage = lazy(() => import('./pages/Homepage/Homepage'));
const Inscription = lazy(() => import('./pages/Inscription/Inscription'));
const Login = lazy(() => import('./pages/Login/Login'));
const GestionFlashcards = lazy(() =>
	import('./pages/GestionFlashcards/GestionFlashcards')
);
const HomepageGestionFlashcards = lazy(() =>
	import('./pages/GestionFlashcards/HomepageGestionFlashcards')
);
const ChapitresParMatiere = lazy(() =>
	import(
		'./pages/GestionFlashcards/Chapitres/ChapitresParMatiere/ChapitresParMatiere'
	)
);
const MatiereEdit = lazy(() =>
	import('./pages/GestionFlashcards/Matieres/MatiereEdit/MatiereEdit')
);
const ChapitreEdit = lazy(() =>
	import('./pages/GestionFlashcards/Chapitres/ChapitreEdit/ChapitreEdit')
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
				path: 'myflashcards/',
				element: <HomepageGestionFlashcards />,
				children: [
					{
						path: ':userid',
						element: <GestionFlashcards />,
						errorElement: <Error />,
						loader: async ({ params }) =>
							await gestionFlashcardsLoader(params.userid),
						children: [],
					},
					{
						path: 'matiere/:matiereid',
						children: [
							{
								path: '',
								loader: ({ params }) =>
									chapitreParMatiereLoader(params.matiereid),
								element: <ChapitresParMatiere />,
							},
							{
								path: 'chapitre/new',
								loader: ({ params }) =>
									chapitreNewLoader(params.matiereid),
								element: <ChapitreEdit />,
							},
							{
								path: 'chapitre/:chapitreid',
							},
							{
								path: 'chapitre/:chapitreid/edit',
								loader: ({ params }) =>
									chapitreEditLoader(params.chapitreid),
								element: <ChapitreEdit />,
							},

							{
								path: 'edit',
								loader: ({ params }) =>
									matiereEditLoader(params.matiereid),
								element: <MatiereEdit />,
							},
						],
					},

					{
						path: 'matiere/new',
						loader: matiereNewLoader,
						element: <MatiereEdit />,
					},
				],
			},
		],
	},
]);
