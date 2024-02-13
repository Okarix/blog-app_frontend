import { useState, useCallback, useMemo, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from '../../redux/slices/auth';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import instance from '../../axios';

export const AddPost = () => {
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const [isLoading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState('');
	const [text, setText] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	const inputFileRef = useRef(null);

	const handleChangeFile = async event => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const { data } = await instance.post('/upload', formData);
			setImageUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Error when file upload');
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl('');
	};

	const onChange = useCallback(text => {
		setText(text);
	}, []);

	const onSubmit = async () => {
		try {
			setLoading(true);

			const fields = {
				imageUrl,
				title,
				text,
				tags: tags.split(','),
			};

			const { data } = await instance.post('/posts', fields);

			const id = data._id;

			navigate(`/posts/${id}`);
		} catch (err) {
			console.warn(err);
			alert('Failed when creating post');
		}
	};

	const options = useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				variant='outlined'
				size='large'
				onClick={() => inputFileRef.current.click()}
			>
				Загрузить превью
			</Button>
			<input
				ref={inputFileRef}
				type='file'
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant='contained'
						color='error'
						onClick={onClickRemoveImage}
					>
						Удалить
					</Button>
					<img
						className={styles.image}
						src={`http://localhost:4444/${imageUrl}`}
						alt='Uploaded'
					/>
				</>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				value={title}
				onChange={e => setTitle(e.target.value)}
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Тэги'
				onChange={e => setTags(e.target.value)}
				value={tags}
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button
					onClick={onSubmit}
					size='large'
					variant='contained'
				>
					Опубликовать
				</Button>
				<a href='/'>
					<Button size='large'>Отмена</Button>
				</a>
			</div>
		</Paper>
	);
};
