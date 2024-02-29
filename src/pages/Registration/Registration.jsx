import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styles from './Registration.module.scss';
import { useRef, useState } from 'react';
import instance from '../../axios';

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const [avatarUrl, setAvatarUrl] = useState('');
	const inputFileRef = useRef(null);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onClickRemoveImage = () => {
		setAvatarUrl('');
	};

	const handleChangeFile = async event => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const { data } = await instance.post('/upload', formData);
			setAvatarUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Error when file upload');
		}
	};

	const onSubmit = async values => {
		const data = await dispatch(fetchRegister({ ...values, avatarUrl: `${import.meta.env.VITE_API_URL}${avatarUrl}` }));
		console.log(data);
		if (!data.payload) {
			alert('Failed to register');
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		}
	};

	if (isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography
				classes={{ root: styles.title }}
				variant='h5'
			>
				Создание аккаунта
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				{avatarUrl && (
					<>
						<ClearIcon
							sx={{ position: 'absolute', cursor: 'pointer', marginLeft: '60px' }}
							fontSize='large'
							color='error'
							onClick={onClickRemoveImage}
						/>
					</>
				)}
				<div className={styles.avatar}>
					<Avatar
						sx={{ width: 100, height: 100, cursor: 'pointer' }}
						onClick={() => inputFileRef.current.click()}
						src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
					/>
					<input
						type='file'
						hidden
						onChange={handleChangeFile}
						ref={inputFileRef}
					/>
				</div>
				<TextField
					className={styles.field}
					label='Full Name'
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					type='text'
					{...register('fullName', { required: 'Enter your fullName' })}
					fullWidth
				/>
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
					label='Password'
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
					disabled={!isValid}
					type='submit'
				>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};
