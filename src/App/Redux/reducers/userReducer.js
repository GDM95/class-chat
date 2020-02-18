import { combineReducers } from 'redux';

const INITIAL_STATE = {
  user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SETUID': 
    return {
        ...state,
        id : action.payload.id
    }
    case 'CREATE_USER':
      console.log('created user', action.user)
      return state
    default:
      return state
  }
};

export default combineReducers({
  user: userReducer,
});