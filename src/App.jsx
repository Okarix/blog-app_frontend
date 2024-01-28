import { Container } from '@mui/material';
import { Header } from './components';
import { Login, Registration, AddPost, Home, FullPost } from './pages';

function App() {
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Home />
				<FullPost />
				<AddPost />
				<Login />
				<Registration />
			</Container>
		</>
	);
}

export default App;
