import { deleteFlashcard } from '../../../../apis/flashcards';
import styles from './FlashcardsParChapitre.module.scss';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';

function FlashcardsParChapitre() {
	const navigate = useNavigate();
	const { flashcards, matiereid } = useLoaderData();
	console.log(flashcards);
	const handleClickDelete = async (id, e) => {
		e.preventDefault();
		e.stopPropagation();
		let mess = window.confirm('Tu veux vraiment supprimer?');
		if (mess === true) {
			await deleteFlashcard(id);
			navigate(0);
		}
	};
	return (
		<>
			<h2>Les flashcards: {flashcards[0]?.chapitre.titre}</h2>
			{flashcards && (
				<ul className={styles.listeFlashcardsParChapitre}>
					{flashcards.map((fl) => (
						<li
							key={fl.id}
							onClick={() => navigate(`flashcards/${fl.id}/edit`)}
						>
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
								<span>
									<i className="fa-solid fa-pencil"></i>
								</span>

								<span>
									<i
										className="fa-solid fa-trash-can"
										onClick={(e) => handleClickDelete(fl.id, e)}
									></i>
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
			<div className={styles.tools}>
				<Link className="icon-btn btn-primary" to="flashcards/new">
					<i class="fa-solid fa-plus"></i>
				</Link>

				<Link
					className="icon-btn btn-primary"
					to={`/myflashcards/matiere/${matiereid}/chapitre/${flashcards[0]?.chapitre.id}/diapo`}
				>
					<i class="fa-solid fa-chalkboard-user"></i>
				</Link>
				<Link
					className="icon-btn btn-primary"
					to={`/myflashcards/matiere/${matiereid}`}
					alt="retour aux matières"
				>
					<i class="fa-solid fa-rotate-left"></i>
				</Link>
			</div>
		</>
	);
}

export default FlashcardsParChapitre;
