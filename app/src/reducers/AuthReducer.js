import { AUTH } from "../constants/ActionTypes";

//Define your initialState
const initialState = {
	accessToken: '',
	isLoggedIn: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTH:
			return {...state, accessToken: action.payload, isLoggedIn: true};
		default:
	 		return state;
	}
}