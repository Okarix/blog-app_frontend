import styles from './AddComment.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { createComment } from '../../redux/slices/comments';

export const AddComment = () => {
	const avatarUrl = useSelector(state => state.auth.data.avatarUrl);
	const dispatch = useDispatch();

	const { id } = useParams();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			text: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async values => {
		try {
			const action = await dispatch(createComment({ postId: id, text: values.text }));
			const data = action.payload;
			console.log(data);
			return data;
		} catch (error) {
			console.error('Error occurred while creating comment:', error);
		}
	};

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={avatarUrl}
				/>
				<div className={styles.form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							label='Написать комментарий'
							variant='outlined'
							maxRows={10}
							multiline
							fullWidth
							error={Boolean(errors.text?.message)}
							helperText={errors.text?.message}
							type='text'
							{...register('text', { required: 'Enter your comment' })}
						/>
						<Button
							variant='contained'
							type='submit'
							disabled={!isValid}
						>
							Отправить
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};
