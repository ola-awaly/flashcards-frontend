import styles from './HomepageGestionFlashcards.module.scss';
import { Outlet } from 'react-router-dom';
function HomepageGestionFlashcards() {
	return (
		<div className={styles.homepage}>
			<Outlet />
		</div>
	);
}

export default HomepageGestionFlashcards;
