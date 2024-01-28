import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);
