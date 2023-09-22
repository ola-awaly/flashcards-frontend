import { createBrowserRouter } from 'react-router-dom';
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
import { flashcardsParChapitreLoader } from './loaders/flashcardsParChapitre';
import { flashcardEditLoader } from './loaders/flashcardEditLoader';
import { flashcardNewLoader } from './loaders/flashcardNewLoader';
import { matiereLoader } from './loaders/matiereLoader';
const Matiere = lazy(() => import('./pages/Matiere/Matiere'));
const Recherche = lazy(() => import('./pages/Recherche/Recherche'));
const FlashcardsDiapo = lazy(() =>
	import(
		'./pages/GestionFlashcards/Flashcards/FlashcardsDiapo/FlashcardsDiapo'
	)
);
const FlashcardsEdit = lazy(() =>
	import('./pages/GestionFlashcards/Flashcards/FlashcardEdit/FlashcardEdit')
);
const FlashcardsParChapitre = lazy(() =>
	import(
		'./pages/GestionFlashcards/Flashcards/FlashcardsParChapitre/FlashcardsParChapitre'
	)
);
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
				errorElement: <Error />,
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
						errorElement: <Error />,
						children: [
							{
								path: '',
								errorElement: <Error />,
								loader: ({ params }) =>
									chapitreParMatiereLoader(params.matiereid),
								element: <ChapitresParMatiere />,
							},
							{
								path: 'chapitre/new',
								errorElement: <Error />,
								loader: ({ params }) =>
									chapitreNewLoader(params.matiereid),
								element: <ChapitreEdit />,
							},
							{
								path: 'chapitre/:chapitreid',
								errorElement: <Error />,

								children: [
									{
										path: '',
										errorElement: <Error />,
										loader: ({ params }) =>
											flashcardsParChapitreLoader(
												params.chapitreid,
												params.matiereid
											),
										element: <FlashcardsParChapitre />,
									},
									{
										path: 'diapo',
										errorElement: <Error />,
										loader: ({ params }) =>
											flashcardsParChapitreLoader(
												params.chapitreid,
												params.matiereid
											),
										element: <FlashcardsDiapo />,
									},
									{
										path: 'edit',
										errorElement: <Error />,
										loader: ({ params }) =>
											chapitreEditLoader(params.chapitreid),
										element: <ChapitreEdit />,
									},
									{
										path: 'flashcards/new',
										errorElement: <Error />,
										loader: ({ params }) =>
											flashcardNewLoader(params.chapitreid),
										element: <FlashcardsEdit />,
									},
									{
										path: 'flashcards/:flashcardid/edit',
										errorElement: <Error />,
										loader: ({ params }) =>
											flashcardEditLoader(params.flashcardid),
										element: <FlashcardsEdit />,
									},
								],
							},

							{
								path: 'edit',
								errorElement: <Error />,
								loader: ({ params }) =>
									matiereEditLoader(params.matiereid),
								element: <MatiereEdit />,
							},
						],
					},

					{
						path: 'matiere/new',
						errorElement: <Error />,
						loader: matiereNewLoader,
						element: <MatiereEdit />,
					},
				],
			},
			{
				path: 'recherche',
				element: <Recherche />,
				errorElement: <Error />,
			},
			{
				path: 'matiere/:matiereid',
				element: <Matiere />,
				loader: ({ params }) => matiereLoader(params.matiereid),
				errorElement: <Error />,
			},
			{
				path: '*',
				element: <Homepage />,
			},
		],
	},
]);
