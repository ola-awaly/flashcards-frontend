import styles from './FlashcardEdit.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLoaderData } from 'react-router-dom';
import {
	createFlashcard,
	modifierFlashcard,
} from '../../../../apis/flashcards';
function FlashcardEdit() {
	const { mode, flashcard } = useLoaderData();
	console.log(flashcard);
	const navigate = useNavigate();
	const flashcardEditSchema = yup.object({
		avant: yup
			.string()
			.required('Champs Obligatoire')
			.min(3, 'Minimum 3 caractère'),
		arriere: yup
			.string()
			.required('Champs Obligatoire')
			.min(10, 'minimum 10 caractères'),
		ordre: yup.number().required('Ordre obligatoire'),
		status: yup.string().required('Status obligatoire'),
	});
	const defaultValues = {
		avant: flashcard.avant,
		arriere: flashcard.arriere,
		ordre: flashcard.ordre,
		status: flashcard.status,
	};
	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { isSubmitting, errors },
	} = useForm({ defaultValues, resolver: yupResolver(flashcardEditSchema) });
	const save = async (values) => {
		console.log(values);
		try {
			clearErrors();
			if (mode === 'new') {
				await createFlashcard({
					avant: values.avant,
					arriere: values.arriere,
					ordre: values.ordre,
					status: values.status,
					chapitre: { id: flashcard.chapitre.id },
				});
			} else {
				await modifierFlashcard(flashcard.id, {
					avant: values.avant,
					arriere: values.arriere,
					ordre: values.ordre,
					status: values.status,
				});
			}

			reset();
			navigate(-1);
		} catch (error) {
			console.log('je catch the error');
			console.log({ e: error });
			setError('general', { type: 'general', message: error.message });
		} finally {
		}
	};

	return (
		<>
			{mode === 'new' ? (
				<h1>Nouveau flashcard </h1>
			) : (
				<h1>Flashcard Edition</h1>
			)}

			<form onSubmit={handleSubmit(save)}>
				<div className={styles.ligne}>
					<label htmlFor="avant">Face</label>
					<input
						type="texte"
						id="avant"
						{...register('avant')}
						className={errors.avant && styles.inputError}
					/>
					{errors.avant && (
						<span className={styles.error}>{errors.avant.message}</span>
					)}
				</div>
				<div className={styles.ligne}>
					<label htmlFor="arriere">Pile</label>
					<textarea
						type="texte"
						id="arriere"
						{...register('arriere')}
						className={errors.arriere && styles.inputError}
					/>
					{errors.arriere && (
						<span className={styles.error}>{errors.arriere.message}</span>
					)}
				</div>
				<div className={styles.ligne}>
					<label htmlFor="ordre">Ordre</label>
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
export default FlashcardEdit;
