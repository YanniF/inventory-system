import { REQUEST_GET_ALL_ITEMS, SUCCESS_GET_ALL_ITEMS, FAIL_GET_ALL_ITEMS } from '../types';

const initialState = {
	items: [],
	selectedItem: {},
	error: null,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_GET_ALL_ITEMS:
			return {
				...state,
				loading: true,
			};
		case SUCCESS_GET_ALL_ITEMS:
			return {
				...state,
				items: action.payload,
				loading: false,
			};
		case FAIL_GET_ALL_ITEMS:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default reducer;
