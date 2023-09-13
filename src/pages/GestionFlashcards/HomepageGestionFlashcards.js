import { Suspense, useContext } from 'react';
import styles from './HomepageGestionFlashcards.module.scss';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
function HomepageGestionFlashcards() {
	const { user } = useContext(AuthContext);
	return (
		<div className={styles.homepage}>
			{!user && <Navigate to="/login" />}
			<Suspense>
				<Outlet />
			</Suspense>
		</div>
	);
}

export default HomepageGestionFlashcards;
