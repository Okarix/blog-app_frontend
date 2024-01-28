import { Container } from '@mui/material';
import { AddPost } from './components/AddPost/AddPost';
import { Header } from './components/Header/Header';
import { FullPost } from './pages/FullPost';
import { Home } from './pages/Home';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';

function App() {
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Home />
				{/* <FullPost />
				<AddPost />
				<Login />
				<Registration /> */}
			</Container>
		</>
	);
}

export default App;
