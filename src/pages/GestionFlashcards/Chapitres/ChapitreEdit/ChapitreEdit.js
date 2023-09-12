import styles from './ChapitreEdit.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { createChapitre, modifierChapitre } from '../../../../apis/chapitres';
function ChapitreEdit() {
	const { user } = useContext(AuthContext);
	const { chapitre, mode } = useLoaderData();
	console.log(mode);
	const navigate = useNavigate();
	const chapitreEditSchema = yup.object({
		titre: yup.string().required('Titre Obligatoire'),
		ordre: yup.number().required('Ordre obligatoire'),
		status: yup.string().required('Status obligatoire'),
	});
	const defaultValues = {
		titre: chapitre.titre,
		ordre: chapitre.ordre,
		status: chapitre.status,
	};
	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { isSubmitting, errors },
	} = useForm({ defaultValues, resolver: yupResolver(chapitreEditSchema) });
	const save = async (values) => {
		console.log(values);
		try {
			clearErrors();
			if (mode === 'new') {
				await createChapitre({
					titre: values.titre,
					ordre: values.ordre,
					status: values.status,
					cours: { id: chapitre.cours.id },
				});
			} else {
				await modifierChapitre(chapitre.id, {
					titre: values.titre,
					ordre: values.ordre,
					status: values.status,
				});
			}

			reset();
			navigate('/myflashcards/matiere/' + chapitre.cours.id);
		} catch (error) {
			console.log(error.message);
			setError('general', { type: 'general', message: error.message });
		} finally {
		}
	};

	return (
		<>
			{mode === 'new' ? (
				<h1>Nouveau chapitre </h1>
			) : (
				<h1>Chapitre Edition</h1>
			)}

			<form onSubmit={handleSubmit(save)}>
				<div className={styles.ligne}>
					<label htmlFor="titre">Titre</label>
					<input
						type="texte"
						id="titre"
						{...register('titre')}
						className={errors.titre && styles.inputError}
					/>
					{errors.titre && (
						<span className={styles.error}>{errors.titre.message}</span>
					)}
				</div>
				<div className={styles.ligne}>
					<label htmlFor="titre">Ordre</label>
					<input
						type="texte"
						id="ordre"
						{...register('ordre')}
						className={errors.ordre && styles.inputError}
					/>
					{errors.ordre && (
						<span className={styles.error}>{errors.ordre.message}</span>
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
				<div className={`${styles.ligne} align-items-center`}>
					<button className="btn btn-primary" disabled={isSubmitting}>
						Sauvegarder
					</button>
				</div>
			</form>
		</>
	);
}
export default ChapitreEdit;
