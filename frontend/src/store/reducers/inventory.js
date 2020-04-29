import {
	SET_SELECTED_ITEM,
	SET_MODAL_VISIBILITY,
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

const initialState = {
	items: [],
	selectedItem: {},
	isOpen: {
		itemModal: false,
		deleteModal: false,
	},
	isRequestingGetAllItems: false,
	isRequestingSaveItem: false,
	isRequestingDeleteItem: false,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_ITEM:
			return {
				...state,
				selectedItem: state.items.find((item) => item.id === action.payload),
			};
		case SET_MODAL_VISIBILITY:
			return {
				...state,
				isOpen: {
					...state.isOpen,
					[action.payload.key]: action.payload.value,
				},
			};
		case REQUEST_GET_ALL_ITEMS:
		case REQUEST_ADD_ITEM:
		case REQUEST_EDIT_ITEM:
		case REQUEST_DELETE_ITEM:
			return {
				...state,
				[action.payload.key]: true,
			};
		case SUCCESS_GET_ALL_ITEMS:
			return {
				...state,
				items: action.payload,
				isRequestingGetAllItems: false,
			};
		case SUCCESS_ADD_ITEM:
			return {
				...state,
				items: [ ...state.items, action.payload ],
				isRequestingSaveItem: false,
				isOpen: {
					...state.isOpen,
					itemModal: false,
				},
			};
		case SUCCESS_EDIT_ITEM:
			return {
				...state,
				items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
				isRequestingSaveItem: false,
				isOpen: {
					...state.isOpen,
					itemModal: false,
				},
				selectedItem: {},
			};
		case SUCCESS_DELETE_ITEM:
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
				isOpen: {
					...state.isOpen,
					deleteModal: false,
				},
				selectedItem: {},
				isRequestingDeleteItem: false,
			};
		case FAIL_GET_ALL_ITEMS:
		case FAIL_ADD_ITEM:
		case FAIL_EDIT_ITEM:
		case FAIL_DELETE_ITEM:
			return {
				...state,
				error: action.payload,
				isRequestingGetAllItems: false,
				isRequestingSaveItem: false,
				isRequestingDeleteItem: false,
			};
		default:
			return state;
	}
};

export default reducer;
