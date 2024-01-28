import { Container } from '@mui/material';
import { Header } from './components';
import { Login, Registration, AddPost, Home, FullPost } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
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
