import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await instance.get('/posts');
	return data;
});

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
	const { data } = await instance.get('/posts/tags');
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
		builder.addCase(fetchTags.pending, state => {
			if (!state.tags) {
				state.tags = {};
			}
			state.tags.status = 'loading';
		});
		builder.addCase(fetchTags.fulfilled, (state, action) => {
			if (!state.tags) {
				state.tags = {};
			}
			state.tags.items = action.payload;
			state.tags.status = 'loaded';
		});
		builder.addCase(fetchTags.rejected, state => {
			if (!state.tags) {
				state.tags = {};
			}
			state.tags.items = [];
			state.tags.status = 'error';
		});
	},
}); // slice create

export const postsReducer = postsSlice.reducer;
