import { useState, useEffect } from 'react';
import { rechercheFlashcards } from './../../../../apis/flashcards';
function ResultatFlashcards({ mot }) {
	const [listFlashcards, setListFlashcards] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		let ignore = false;

		const getFlashcards = async () => {
			try {
				setIsLoading(true);
				if (!ignore) {
					setListFlashcards(await rechercheFlashcards(mot));
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (!ignore) setIsLoading(false);
			}
		};

		getFlashcards();
		return () => {
			ignore = true;
		};
	}, [mot]);

	return (
		<div>
			<h2>
				<i class="fa-regular fa-hand-point-right"></i> Flashcards
			</h2>
			<ul>
				{isLoading === false ? (
					listFlashcards.length > 0 ? (
						listFlashcards.map((fl) => <li key={fl.id}>{fl.avant}</li>)
					) : (
						'Pas de résultats'
					)
				) : (
					<i className="fa-solid fa-spinner fa-spin"></i>
				)}
			</ul>
		</div>
	);
}
export default ResultatFlashcards;
