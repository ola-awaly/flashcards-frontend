import { useContext } from 'react';
import styles from './ChapitresParMatiere.module.scss';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthContext';
function ChapitresParMatiere() {
	const chapitres = useLoaderData();
	const { user } = useContext(AuthContext);
	return (
		<>
			<h2>Les chapitres: {chapitres[0]?.cours.nom}</h2>
			{chapitres && (
				<ul className={styles.listeChapitresParMatiere}>
					{chapitres.map((cha) => (
						<li>
							<span>{cha.titre}</span>
							<span>{cha.nbreFlashcards} flashcards</span>
							<span
								className={
									cha.status === 'private'
										? styles.private
										: styles.public
								}
							>
								private
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
			<div className={styles.tools}>
				<Link className="btn btn-primary" to="/matiere/new">
					+ Nouveau Chapitre
				</Link>
				<Link className="btn btn-primary" to={`/myflashcards/${user.id}`}>
					Retour aux matières
				</Link>
			</div>
		</>
	);
}

export default ChapitresParMatiere;
