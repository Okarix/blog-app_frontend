import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async params => {
	const { data } = await instance.post('/login', params);
	return data;
});

export const fetchLogin = createAsyncThunk('me/fetchLogin', async () => {
	const { data } = await instance.get('/me');
	return data;
});

const initialState = {
	data: null,
	status: 'loading',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAuth.pending, state => {
			state.status = 'loading';
			state.data = null;
		});
		builder.addCase(fetchAuth.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = 'loaded';
		});
		builder.addCase(fetchAuth.rejected, state => {
			state.status = 'error';
			state.data = null;
		});
		builder.addCase(fetchLogin.pending, state => {
			state.status = 'loading';
			state.data = null;
		});
		builder.addCase(fetchLogin.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = 'loaded';
		});
		builder.addCase(fetchLogin.rejected, state => {
			state.status = 'error';
			state.data = null;
		});
	},
});

export const selectIsAuth = state => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
