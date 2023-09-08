import styles from './GestionFlashcards.module.scss';
import { useLoaderData } from 'react-router';
function GestionFlashcards() {
	const matieres = useLoaderData();
	return (
		<div className={styles.gestionFlashcards}>
			<h1>Mes matières</h1>

			{matieres && (
				<ul className={styles.listFlashcards}>
					{matieres.map((mat) => (
						<li key={mat.id}>
							<span>{mat.nom}</span>
							<span>{mat.nbreChapitre} chapitres</span>
							<span
								className={
									mat.status === 'private'
										? styles.private
										: styles.public
								}
							>
								{mat.status}
							</span>
							<div>
								<span>
									<i className="fa-solid fa-pencil"></i>
								</span>
								<span>
									<i className="fa-solid fa-trash-can"></i>
								</span>
							</div>
						</li>
					))}
				</ul>
			)}

			<button className="btn btn-primary"> + Nouvelle Matière</button>
		</div>
	);
}

export default GestionFlashcards;
