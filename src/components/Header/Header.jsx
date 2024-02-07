import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	const onClickLogout = () => {
		if (window.confirm('You sure you want to go out?')) {
			dispatch(logout());
			window.localStorage.removeItem('token');
		}
	};

	return (
		<div className={styles.root}>
			<Container maxWidth='lg'>
				<div className={styles.inner}>
					<Link
						className={styles.logo}
						to='/'
					>
						<div>Blog App</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to='/addPost'>
									<Button variant='contained'>Написать статью</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant='contained'
									color='error'
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to='/login'>
									<Button variant='outlined'>Войти</Button>
								</Link>
								<Link to='/register'>
									<Button variant='contained'>Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
