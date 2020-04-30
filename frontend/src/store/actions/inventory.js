import axios from 'axios';
import {
	SET_SELECTED_ITEM,
	SET_MODAL_VISIBILITY,
	CLEAR_ERRORS,
	REQUEST_GET_ALL_ITEMS,
	SUCCESS_GET_ALL_ITEMS,
	FAIL_GET_ALL_ITEMS,
	REQUEST_ADD_ITEM,
	SUCCESS_ADD_ITEM,
	FAIL_ADD_ITEM,
	REQUEST_EDIT_ITEM,
	SUCCESS_EDIT_ITEM,
	FAIL_EDIT_ITEM,
	REQUEST_DELETE_ITEM,
	SUCCESS_DELETE_ITEM,
	FAIL_DELETE_ITEM,
} from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

export const selectItem = (id) => (dispatch) => {
	dispatch(actionCreator(SET_SELECTED_ITEM, id));
};

export const setModalVisibility = (modal, value = false) => (dispatch) => {
	if (!value) {
		dispatch(actionCreator(CLEAR_ERRORS));
	}

	dispatch(actionCreator(SET_MODAL_VISIBILITY, { key: modal, value }));
};

export const clearErrors = () => (dispatch) => {
	dispatch(actionCreator(CLEAR_ERRORS));
};

export const getAllItems = () => (dispatch) => {
	dispatch(actionCreator(REQUEST_GET_ALL_ITEMS, { key: 'isRequestingGetAllItems' }));
	axios
		.get('/items')
		.then((res) => {
			dispatch(actionCreator(SUCCESS_GET_ALL_ITEMS, res.data));
		})
		.catch((err) => {
			dispatch(actionCreator(FAIL_GET_ALL_ITEMS, err.response.data));
		});
};

export const addItem = (item) => (dispatch) => {
	dispatch(actionCreator(REQUEST_ADD_ITEM, { key: 'isRequestingSaveItem' }));
	axios
		.post('/items', item)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_ADD_ITEM, res.data));
		})
		.catch((err) => {
			dispatch(actionCreator(FAIL_ADD_ITEM, err.response.data));
		});
};

export const editItem = (item) => (dispatch) => {
	dispatch(actionCreator(REQUEST_EDIT_ITEM, { key: 'isRequestingSaveItem' }));
	axios
		.put(`/items/${item.id}`, item)
		.then(() => {
			dispatch(actionCreator(SUCCESS_EDIT_ITEM, item));
		})
		.catch((err) => {
			dispatch(actionCreator(FAIL_EDIT_ITEM, err.response.data));
		});
};

export const deleteItem = (id) => (dispatch) => {
	dispatch(actionCreator(REQUEST_DELETE_ITEM, { key: 'isRequestingDeleteItem' }));
	axios
		.delete(`/items/${id}`)
		.then(() => {
			dispatch(actionCreator(SUCCESS_DELETE_ITEM, id));
		})
		.catch((err) => {
			dispatch(actionCreator(FAIL_DELETE_ITEM, err.response.data));
		});
};
