import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

export const createComment = createAsyncThunk('comments/createComment', async ({ postId, text }) => {
	const { data } = await instance.post(`/posts/${postId}/createComment`, { text: text });

	return data;
});

export const fetchComments = createAsyncThunk('comments/fetchComments', async postId => {
	const { data } = await instance.get(`/posts/${postId}/comments`);

	return data;
});

const initialState = {
	comments: {
		items: [],
		status: 'loading',
	},
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(createComment.fulfilled, (state, action) => {
			state.comments.items.push(action.payload);
		});
		builder.addCase(fetchComments.pending, state => {
			if (!state.comments) {
				state.comments = {};
			}
			state.comments.status = 'loading';
		});
		builder.addCase(fetchComments.fulfilled, (state, action) => {
			if (!state.comments) {
				state.comments = {};
			}
			state.comments.items = action.payload;
			state.comments.status = 'loaded';
		});
		builder.addCase(fetchComments.rejected, state => {
			if (!state.comments) {
				state.comments = {};
			}
			state.comments.items = [];
			state.comments.status = 'error';
		});
	},
});

export const commentsReducer = commentsSlice.reducer;
