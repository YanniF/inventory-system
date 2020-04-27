import { AUTH_START, AUTH_FAIL, SET_TOKEN, SET_UNAUTHENTICATED } from '../types';

const initialState = {
	token: null,
	error: null,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_START:
			return {
				...state,
				loading: true,
			};
		case AUTH_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case SET_TOKEN:
			return {
				...state,
				token: action.payload,
				loading: false,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		default:
			return state;
	}
};

export default reducer;
