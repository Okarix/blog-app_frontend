import { Button, Container } from '@mui/material';
import styles from './Header.module.scss';

export const Header = () => {
	return (
		<div className={styles.root}>
			<Container maxWidth='lg'>
				<div className={styles.inner}>
					<a
						className={styles.logo}
						href='/'
					>
						<div>Blog App</div>
					</a>
					<div className={styles.buttons}>
						<Button variant='outlined'>Войти</Button>
						<Button variant='contained'>Создать аккаунт</Button>
					</div>
				</div>
			</Container>
		</div>
	);
};
