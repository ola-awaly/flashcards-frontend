import styles from './Matiere.module.scss';
import { useLoaderData } from 'react-router-dom';
function Matiere() {
	const { matiere, chapitres } = useLoaderData();
	return (
		<div className={styles.matiere}>
			<h1>
				{matiere.nom} <small>({matiere.nbreChapitre} chapitres)</small>
			</h1>

			<ul>
				{chapitres.length > 0
					? chapitres.map((ch) => <li key={ch.id}>{ch.titre}</li>)
					: 'Pas de Chapitres'}
			</ul>
		</div>
	);
}

export default Matiere;
