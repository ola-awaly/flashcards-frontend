import { useContext } from 'react';
import styles from './ChapitresParMatiere.module.scss';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthContext';
import { deleteChapitre } from '../../../../apis/chapitres';
function ChapitresParMatiere() {
	const navigate = useNavigate();
	const { chapitres } = useLoaderData();
	const { user } = useContext(AuthContext);
	const handleClickDelete = async (id, e) => {
		e.preventDefault();
		e.stopPropagation();
		let mess = window.confirm('Tu veux vraiment supprimer?');
		if (mess === true) {
			await deleteChapitre(id);
			navigate(0);
		}
	};
	const handleClickEdit = async (id, e) => {
		e.stopPropagation();
		navigate(`chapitre/${id}/edit`);
	};
	const goTOEdit = (id) => {
		navigate(`chapitre/${id}`);
	};
	return (
		<>
			<h2>Les chapitres: {chapitres[0]?.cours.nom}</h2>
			{chapitres && (
				<ul className={styles.listeChapitresParMatiere}>
					{chapitres.map((cha) => (
						<li key={cha.id} onClick={() => goTOEdit(cha.id)}>
							<span>{cha.titre}</span>
							<span>{cha.nbreFlashcards} flashcards</span>
							<span
								className={
									cha.status === 'private'
										? styles.private
										: styles.public
								}
							>
								{cha.status}
							</span>
							<div>
								<span>
									<i
										onClick={(e) => handleClickEdit(cha.id, e)}
										className="fa-solid fa-pencil"
									></i>
								</span>

								<span>
									<i
										className="fa-solid fa-trash-can"
										onClick={(e) => handleClickDelete(cha.id, e)}
									></i>
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
			<div className={styles.tools}>
				<Link className="icon-btn btn-primary" to="chapitre/new">
					<i class="fa-solid fa-plus"></i>
				</Link>
				<Link
					className="icon-btn btn-primary"
					to={`/myflashcards/${user.id}`}
				>
					<i class="fa-solid fa-rotate-left"></i>
				</Link>
			</div>
		</>
	);
}

export default ChapitresParMatiere;
