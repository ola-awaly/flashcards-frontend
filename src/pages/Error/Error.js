import styles from './Error.module.scss';

function Error() {
	return (
		<div className={styles.errorPage}>
			<p>
				Une erreur est survenue sur le site. Veuillez retourner sur la page
				d'accueil
			</p>
		</div>
	);
}
export default Error;
