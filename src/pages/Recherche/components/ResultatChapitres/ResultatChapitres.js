import { useState, useEffect } from 'react';
import { rechercheChapitres } from './../../../../apis/chapitres';
function ResultatChapitres({ mot }) {
	const [listChapitres, setListChapitres] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		let ignore = false;

		const getChapitres = async () => {
			try {
				setIsLoading(true);
				if (!ignore) {
					setListChapitres(await rechercheChapitres(mot));
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (!ignore) setIsLoading(false);
			}

			//console.log(listChapitres);
		};

		getChapitres();
		return () => {
			ignore = true;
		};
	}, [mot]);
	return (
		<div>
			<h2>
				<i class="fa-regular fa-hand-point-right"></i> Chapitres
			</h2>
			<ul>
				{isLoading === false ? (
					listChapitres.length > 0 ? (
						listChapitres.map((ch) => <li key={ch.id}>{ch.titre}</li>)
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
export default ResultatChapitres;
