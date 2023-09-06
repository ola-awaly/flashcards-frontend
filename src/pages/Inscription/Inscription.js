import styles from './Inscription.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUser } from '../../apis';
import { useNavigate } from 'react-router-dom';
function Inscription() {
	const navigate = useNavigate();
	const signupSchema = yup.object({
		email: yup
			.string()
			.required('Email Obligatoire')
			.email('Veuillez renseigner un email valide'),
		password: yup
			.string()
			.required('Mot de passe obligatoire')
			.min(6, 'Minimum 6 caractères'),
		confirmpassword: yup
			.string()
			.required('Mot de passe obligatoire')

			.oneOf(
				[yup.ref('password'), ''],
				'les 2 mots de passe doivent correspondre'
			),
	});
	const defaultValues = {
		email: '',
		password: '',
		confirmpassword: '',
	};
	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { isSubmitting, errors },
	} = useForm({ defaultValues, resolver: yupResolver(signupSchema) });
	const doSignup = async (values) => {
		console.log(values);
		try {
			clearErrors();
			await createUser({
				email: values.email,
				plainPassword: values.password,
			});
			reset();
			navigate('/');
		} catch (error) {
			console.log(error.message);
			setError('general', { type: 'general', message: error.message });
		} finally {
		}
	};
	return (
		<div className={`${styles.inscription} flex-fill`}>
			<h1>Je crée un compte</h1>

			<form onSubmit={handleSubmit(doSignup)}>
				<div className={styles.ligne}>
					<label htmlFor="email">Email</label>
					<input
						type="texte"
						id="email"
						{...register('email')}
						className={errors.email && styles.inputError}
					/>
					{errors.email && (
						<span className={styles.error}>{errors.email.message}</span>
					)}
				</div>
				<div className={styles.ligne}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						{...register('password')}
						className={errors.password && styles.inputError}
					/>
					{errors.password && (
						<span className={styles.error}>
							{errors.password.message}
						</span>
					)}
				</div>
				<div className={styles.ligne}>
					<label htmlFor="confirm-password">Confirm Password</label>
					<input
						type="password"
						id="confirm-password"
						className={errors.confirmpassword && styles.inputError}
						{...register('confirmpassword')}
					/>
					{errors.confirmpassword && (
						<span className={styles.error}>
							{errors.confirmpassword.message}
						</span>
					)}
				</div>

				{errors?.general && (
					<div className={styles.ligne}>
						<span className={styles.error}>{errors.general.message}</span>
					</div>
				)}
				<div className={`${styles.ligne} align-items-center`}>
					<button className="btn btn-primary" disabled={isSubmitting}>
						Allez hop
					</button>
				</div>
			</form>
		</div>
	);
}
export default Inscription;
