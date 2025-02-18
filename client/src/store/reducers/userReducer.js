import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.USER_AUTH_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case ACTION_TYPES.USER_LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}
