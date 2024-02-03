import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';

const store = configureStore({
	reducer: {
		posts: postsReducer,
	},
}); // создаем store

export default store;
