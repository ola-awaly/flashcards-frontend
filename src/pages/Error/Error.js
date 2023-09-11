import { useContext } from 'react';
import styles from './Error.module.scss';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
function Error() {
	const error = useRouteError();
	const { setExpired } = useContext(AuthContext);
	if (error) {
		console.log(error.message);

		if (error.message && error.message === 'Invalid JWT Token') {
			setExpired(true);
		}
	}

	return (
		<div className={styles.errorPage}>
			<p>
				Une erreur est survenue sur le site. Veuillez retourner sur la page
				d'accueil
			</p>
			<p>
				Détails de l'erreur: {error?.error?.toString()} {error?.message}
			</p>
		</div>
	);
}
export default Error;
