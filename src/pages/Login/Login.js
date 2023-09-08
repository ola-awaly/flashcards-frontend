import styles from './Login.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
function Login() {
	const { signin } = useContext(AuthContext);
	const navigate = useNavigate();
	const loginSchema = yup.object({
		email: yup
			.string()
			.required('Email Obligatoire')
			.email('Veuillez renseigner un email valide'),
		password: yup.string().required('Mot de passe obligatoire'),
	});
	const defaultValues = {
		email: '',
		password: '',
	};
	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { isSubmitting, errors },
	} = useForm({ defaultValues, resolver: yupResolver(loginSchema) });
	const doLogin = async (values) => {
		console.log(values);
		try {
			clearErrors();
			await signin({
				email: values.email,
				password: values.password,
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
		<div className={`${styles.login} flex-fill`}>
			<h1>Je me connecte</h1>

			<form onSubmit={handleSubmit(doLogin)}>
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

				{errors?.general && (
					<div className={styles.ligne}>
						<span className={styles.error}>{errors.general.message}</span>
					</div>
				)}
				<div className={`${styles.ligne} align-items-center`}>
					<button className="btn btn-primary" disabled={isSubmitting}>
						Entrez
					</button>
				</div>
			</form>
		</div>
	);
}
export default Login;
