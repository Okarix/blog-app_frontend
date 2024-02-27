import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await instance.get('/posts');
	return data;
});

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {
	const { data } = await instance.get('/posts/popular');
	return data;
});

export const fetchByTag = createAsyncThunk('/posts/fetchByTag', async tag => {
	const { data } = await instance.get(`/posts/byTag/${tag}`);
	return data;
});

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
	const { data } = await instance.get('/posts/tags');
	return data;
});

export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async id => {
	instance.delete(`/posts/${id}`);
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
		// GET POSTS
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
		// GET TAGS
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
		// DELETE POSTS
		builder.addCase(fetchRemovePost.pending, (state, action) => {
			state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg);
		});
		// GET POPULAR POSTS
		builder.addCase(fetchPopularPosts.pending, state => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.status = 'loading';
		});
		builder.addCase(fetchPopularPosts.fulfilled, (state, action) => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.items = action.payload;
			state.posts.status = 'loaded';
		});
		builder.addCase(fetchPopularPosts.rejected, state => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.items = [];
			state.posts.status = 'error';
		});
		// GET POSTS BY TAG
		builder.addCase(fetchByTag.pending, state => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.status = 'loading';
		});
		builder.addCase(fetchByTag.fulfilled, (state, action) => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.items = action.payload;
			state.posts.status = 'loaded';
		});
		builder.addCase(fetchByTag.rejected, state => {
			if (!state.posts) {
				state.posts = {};
			}
			state.posts.items = [];
			state.posts.status = 'error';
		});
	},
}); // slice create

export const postsReducer = postsSlice.reducer;
