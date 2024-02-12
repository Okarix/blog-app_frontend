import { useState, useCallback, useMemo, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from '../../redux/slices/auth';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import instance from '../../axios';

export const AddPost = () => {
	const isAuth = useSelector(selectIsAuth);

	const [value, setValue] = useState('');
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	const inputFileRef = useRef(null);

	const handleChangeFile = async event => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const { data } = await instance.post('/upload', formData);
			setImgUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Error when file upload');
		}
	};

	console.log(imgUrl);

	const onClickRemoveImage = () => {};

	const onChange = useCallback(value => {
		setValue(value);
	}, []);

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
			{imgUrl && (
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
						src={`http://localhost:4444/${imgUrl}`}
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
				value={value}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button
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
