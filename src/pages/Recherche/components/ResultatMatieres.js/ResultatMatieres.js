import { useState, useEffect } from 'react';
import { rechercheMatieres } from './../../../../apis/matieres';
import { Link } from 'react-router-dom';
function ResultatMatieres({ mot }) {
	const [listMatieres, setListMatieres] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		let ignore = false;

		const getMat = async () => {
			try {
				setIsLoading(true);
				if (!ignore) {
					setListMatieres(await rechercheMatieres(mot));
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (!ignore) setIsLoading(false);
			}

			//console.log(listMatieres);
		};

		getMat();
		return () => {
			ignore = true;
		};
	}, [mot]);
	return (
		<div>
			<h2>
				<i class="fa-regular fa-hand-point-right"></i> Matières
			</h2>
			<ul>
				{isLoading === false ? (
					listMatieres.length > 0 ? (
						listMatieres.map((m) => (
							<li key={m.id}>
								<Link to={`/matiere/${m.id}`}>{m.nom}</Link>
							</li>
						))
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
export default ResultatMatieres;
