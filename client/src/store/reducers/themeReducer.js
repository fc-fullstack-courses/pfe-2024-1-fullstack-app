import CONSTANTS from '../../constants';
import ACTION_TYPES from '../actions/actionTypes';

const { THEMES } = CONSTANTS;

const initialState = THEMES.DARK_THEME;

export default function themeReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_THEME: {

      return action.payload;
    }
    default: return state;
  }
}