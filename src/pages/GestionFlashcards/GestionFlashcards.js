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
	const handleClickEdit = async (id, e) => {
		e.stopPropagation();
		navigate(`/myflashcards/matiere/${id}/edit`);
	};
	const goTOEdit = (id) => {
		navigate(`/myflashcards/matiere/${id}`);
	};
	return (
		<>
			<h1>Mes matières</h1>

			{matieres && (
				<ul className={styles.listFlashcards}>
					{matieres.map((mat) => (
						<li onClick={() => goTOEdit(mat.id)} key={mat.id}>
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
									<i
										onClick={(e) => handleClickEdit(mat.id, e)}
										className="fa-solid fa-pencil"
									></i>
								</span>

								<span>
									<i
										className="fa-solid fa-trash-can"
										onClick={(e) => handleClickDelete(mat.id, e)}
									></i>
								</span>
							</div>
						</li>
					))}
				</ul>
			)}

			<Link className="btn btn-primary" to="/myflashcards/matiere/new">
				+ Nouvelle Matière
			</Link>
		</>
	);
}

export default GestionFlashcards;
