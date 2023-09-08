import { deleteMatiere } from '../../apis/matieres';
import styles from './GestionFlashcards.module.scss';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
function GestionFlashcards() {
	const matieres = useLoaderData();
	const navigate = useNavigate();
	const handleClickDelete = async (id, e) => {
		e.preventDefault();
		e.stopPropagation();
		let mess = window.confirm('Tu veux vraiment supprimer?');
		if (mess === true) {
			await deleteMatiere(id);
			navigate(0);
		}
	};

	return (
		<div className={styles.gestionFlashcards}>
			<h1>Mes matières</h1>

			{matieres && (
				<ul className={styles.listFlashcards}>
					{matieres.map((mat) => (
						<Link to={`/matiere/${mat.id}/chapitres`} key={mat.id}>
							<li as="Link">
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
										<Link to={`/matiere/${mat.id}/edit`}>
											<i className="fa-solid fa-pencil"></i>
										</Link>
									</span>
									<span>
										<i
											className="fa-solid fa-trash-can"
											onClick={(e) => handleClickDelete(mat.id, e)}
										></i>
									</span>
								</div>
							</li>
						</Link>
					))}
				</ul>
			)}

			<Link className="btn btn-primary" to="/matiere/new">
				+ Nouvelle Matière
			</Link>
		</div>
	);
}

export default GestionFlashcards;
