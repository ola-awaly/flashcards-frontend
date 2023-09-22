import styles from './Recherche.module.scss';
import { useState, Suspense, lazy } from 'react';
const ResultatFlashcards = lazy(() =>
	import('./components/ResultatFlashcards/ResultatFlashcards')
);
const ResultatChapitres = lazy(() =>
	import('./components/ResultatChapitres/ResultatChapitres')
);
const ResultatMatieres = lazy(() =>
	import('./components/ResultatMatieres.js/ResultatMatieres')
);
function Recherche() {
	const [mot, setMot] = useState('');

	return (
		<div className={styles.recherche}>
			<div className={styles.inputRecherche}>
				<label htmlFor="input-recherche">
					<i class="fa-solid fa-magnifying-glass"></i>
				</label>
				<input
					type="text"
					id="input-recherche"
					onChange={(e) => setMot(e.target.value)}
				/>
			</div>
			<div className={styles.resultats}>
				<Suspense fallback={<i class="fa-solid fa-spinner fa-spin"></i>}>
					<ResultatMatieres mot={mot} />
				</Suspense>
				<Suspense fallback={<i class="fa-solid fa-spinner fa-spin"></i>}>
					<ResultatChapitres mot={mot} />
				</Suspense>
				<Suspense fallback={<i class="fa-solid fa-spinner fa-spin"></i>}>
					<ResultatFlashcards mot={mot} />
				</Suspense>
			</div>
		</div>
	);
}

export default Recherche;
