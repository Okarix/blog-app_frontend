import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await instance.get('/posts');
	return data;
});

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
}; // создаем базовое состояние

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchPosts.pending, state => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.status = 'loading';
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.items = action.payload;
			state.posts.status = 'loaded';
		});
		builder.addCase(fetchPosts.rejected, state => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.items = [];
			state.posts.status = 'error';
		});
	},
}); // slice create

export const postsReducer = postsSlice.reducer;
