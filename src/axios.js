import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://localhost:4444',
});

export default instance;
