import { Container } from '@mui/material';
import { Header } from './components';
import { Login, Registration, AddPost, Home, FullPost } from './pages';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLogin, selectIsAuth } from './redux/slices/auth';

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	useEffect(() => {
		dispatch(fetchLogin());
	}, []);

	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/posts/:id'
						element={<FullPost />}
					/>
					<Route
						path='/posts/:id/edit'
						element={<AddPost />}
					/>
					<Route
						path='/addPost'
						element={<AddPost />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Registration />}
					/>
				</Routes>
			</Container>
		</>
	);
}

export default App;
