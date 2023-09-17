import { useLoaderData, Link } from 'react-router-dom';
import styles from './FlashcardsDiapo.module.scss';
import { useState } from 'react';
function FlashcardsDiapo() {
	const { flashcards, matiereid } = useLoaderData();
	const [activeIndex, setActiveIndex] = useState(0);
	const [clicked, setClicked] = useState(false);
	console.log(flashcards);
	const getClassName = (index) => {
		let cn = '';

		if (index === activeIndex) cn = `${styles.diapoItem} ${styles.active}`;
		else cn = `${styles.diapoItem}`;
		if (clicked) cn += ` ${styles.clicked}`;
		return cn;
	};
	return (
		<>
			<h2> {flashcards[0]?.chapitre.titre}</h2>
			<div className="d-flex justify-content-center align-items-center">
				<div className="d-flex align-items-center">
					<i
						className={
							activeIndex !== 0
								? `fa-solid fa-circle-left ${styles.reculer} `
								: `${styles.disabled} fa-solid fa-circle-left ${styles.reculer}`
						}
						onClick={() => {
							if (activeIndex !== 0) {
								setClicked(false);
								setActiveIndex(activeIndex - 1);
							}
						}}
					></i>
				</div>

				{flashcards &&
					flashcards.map((fl, index) => (
						<div
							className={getClassName(index)}
							key={fl.id}
							id={index}
							onClick={() => setClicked(!clicked)}
						>
							<div className={styles.inner}>
								<div className={styles.face}>{fl.avant}</div>
								<div className={styles.pile}>{fl.arriere}</div>
							</div>
						</div>
					))}

				<div className="d-flex align-items-center">
					<i
						className={
							activeIndex < flashcards.length - 1
								? `fa-solid fa-circle-right ${styles.avancer}`
								: `${styles.disabled} fa-solid fa-circle-right ${styles.avancer}`
						}
						onClick={() => {
							if (activeIndex < flashcards.length - 1) {
								setClicked(false);
								setActiveIndex(activeIndex + 1);
							}
						}}
					></i>
				</div>
			</div>
			<div className={styles.tools}>
				<Link
					className="icon-btn btn-primary"
					to={`/myflashcards/matiere/${matiereid}/chapitre/${flashcards[0]?.chapitre.id}`}
				>
					<i class="fa-solid fa-pen"></i>
				</Link>
				<Link
					className="icon-btn btn-primary"
					to={`/myflashcards/matiere/${matiereid}`}
				>
					<i class="fa-solid fa-rotate-left"></i>
				</Link>
			</div>
		</>
	);
}
export default FlashcardsDiapo;
