import styles from './MatiereEdit.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { createMatiere, modifierMatiere } from '../../../../apis/matieres';
function MatiereEdit() {
	const { user } = useContext(AuthContext);
	const data = useLoaderData();
	console.log(data.mode);
	const navigate = useNavigate();
	const matiereEditSchema = yup.object({
		nom: yup.string().required('Nom Obligatoire'),
		status: yup.string().required('Status obligatoire'),
	});
	const defaultValues = {
		nom: data.matiere.nom,
		status: data.matiere.status,
	};
	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { isSubmitting, errors },
	} = useForm({ defaultValues, resolver: yupResolver(matiereEditSchema) });
	const save = async (values) => {
		console.log(values);
		try {
			clearErrors();
			if (data.mode === 'new') {
				await createMatiere({
					nom: values.nom,
					status: values.status,
					user: '/api/users/' + user.id,
				});
			} else {
				await modifierMatiere(data.matiere.id, {
					nom: values.nom,
					status: values.status,
				});
			}

			reset();
			navigate('/myflashcards/' + user.id);
		} catch (error) {
			console.log(error.message);
			setError('general', { type: 'general', message: error.message });
		} finally {
		}
	};
	return (
		<>
			{data.mode === 'new' ? (
				<h1>Nouvelle Matiere </h1>
			) : (
				<h1>Matiere édition</h1>
			)}

			<form onSubmit={handleSubmit(save)}>
				<div className={styles.ligne}>
					<label htmlFor="nom">Nom</label>
					<input
						type="texte"
						id="nom"
						{...register('nom')}
						className={errors.nom && styles.inputError}
					/>
					{errors.nom && (
						<span className={styles.error}>{errors.nom.message}</span>
					)}
				</div>
				<div className={styles.ligne}>
					<label htmlFor="status">status</label>
					<select
						{...register('status')}
						id="status"
						className={errors.nom && styles.inputError}
					>
						<option value="public">Public</option>
						<option value="private">Privé</option>
					</select>

					{errors.status && (
						<span className={styles.error}>{errors.status.message}</span>
					)}
				</div>

				{errors?.general && (
					<div className={styles.ligne}>
						<span className={styles.error}>{errors.general.message}</span>
					</div>
				)}
				<div className={styles.tools}>
					<button
						className="btn btn-secondary"
						onClick={() => navigate(-1)}
					>
						Annuler
					</button>
					<button className="btn btn-primary" disabled={isSubmitting}>
						Sauvegarder
					</button>
				</div>
			</form>
		</>
	);
}
export default MatiereEdit;
