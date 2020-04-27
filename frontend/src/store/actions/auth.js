import axios from 'axios';
import { AUTH_START, AUTH_FAIL, SET_TOKEN, SET_UNAUTHENTICATED } from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

const setAuthorizationHeader = (token) => {
	const firebaseToken = `Bearer ${token}`;
	localStorage.setItem('token', firebaseToken);
	axios.defaults.headers.common['Authorization'] = firebaseToken;
};

export const setToken = (token) => (dispatch) => {
	dispatch(actionCreator(SET_TOKEN, token));
};

export const login = (user) => (dispatch) => {
	dispatch(actionCreator(AUTH_START));
	axios
		.post('/login', user)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(setToken(res.data.token));
		})
		.catch((err) => {
			dispatch(actionCreator(AUTH_FAIL, err.response.data));
		});
};

export const register = (newUser) => (dispatch) => {
	dispatch(actionCreator(AUTH_START));

	axios
		.post('/register', newUser)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(actionCreator(SET_TOKEN, res.data.token));
		})
		.catch((err) => {
			dispatch(actionCreator(AUTH_FAIL, err.response.data));
		});
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('token');
	delete axios.defaults.headers.common['Authorization'];

	dispatch({ type: SET_UNAUTHENTICATED });
};
