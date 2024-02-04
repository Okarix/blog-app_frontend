import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { fetchAuth } from '../../redux/slices/auth';

export const Login = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = values => {
		dispatch(fetchAuth(values));
	};

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography
				classes={{ root: styles.title }}
				variant='h5'
			>
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label='E-Mail'
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type='email'
					{...register('email', { required: 'Enter your email' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label='Пароль'
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					type='password'
					{...register('password', { required: 'Enter your password' })}
					fullWidth
				/>
				<Button
					size='large'
					variant='contained'
					fullWidth
					type='submit'
				>
					Войти
				</Button>
			</form>
		</Paper>
	);
};
