import axios from 'axios';
import { REQUEST_GET_ALL_ITEMS, SUCCESS_GET_ALL_ITEMS, FAIL_GET_ALL_ITEMS } from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

export const getAllItems = () => (dispatch) => {
	dispatch(actionCreator(REQUEST_GET_ALL_ITEMS));
	axios
		.get('/items')
		.then((res) => {
			dispatch(actionCreator(SUCCESS_GET_ALL_ITEMS, res.data));
		})
		.catch((err) => {
			dispatch(actionCreator(FAIL_GET_ALL_ITEMS, err.response.data));
		});
};
