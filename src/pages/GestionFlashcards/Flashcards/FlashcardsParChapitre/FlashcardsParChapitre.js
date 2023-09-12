import styles from './FlashcardsParChapitre.module.scss';
import { useLoaderData, Link } from 'react-router-dom';

function FlashcardsParChapitre() {
	const { flashcards, matiereid } = useLoaderData();
	console.log(flashcards);
	return (
		<>
			<h2>Chapitre 1: Introduction</h2>
			{flashcards && (
				<ul className={styles.listeFlashcardsParChapitre}>
					{flashcards.map((fl) => (
						<li key={fl.id}>
							<span>{fl.avant}</span>

							<span
								className={
									fl.status === 'private'
										? styles.private
										: styles.public
								}
							>
								{fl.status}
							</span>
							<div>
								<Link>
									<span>
										<i className="fa-solid fa-pencil"></i>
									</span>
								</Link>
								<span>
									<i className="fa-solid fa-trash-can"></i>
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
			<div className={styles.tools}>
				<Link className="btn btn-primary" to="flashcards/new">
					+ Nouveau Flashcard
				</Link>
				<Link
					className="btn btn-primary"
					to={`/myflashcards/matiere/${matiereid}`}
				>
					Retour aux chapitres
				</Link>
			</div>
		</>
	);
}

export default FlashcardsParChapitre;
