import { combineReducers } from 'redux';

const INITIAL_STATE = {
    avatar: '',
    updateEmailError: null,
    updateNameError: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_AVATAR_SUCCESS':
      console.log('Successfully updated avatar')
      return {
        ... state,
        avatar: action.avatar,
      }
    case 'UPDATE_AVATAR_ERROR':
      return state
    case 'UPDATE_NAME_SUCCESS':
      return state
    case 'UPDATE_NAME_ERROR':
      return {
        ...state,
        updateNameError: action.err
      }
    case 'UPDATE_EMAIL_SUCCESS':
      console.log('Successfully updated email: ', action.email)
      return state
    case 'UPDATE_EMAIL_ERROR':
      console.log('Update email error: ', action.err)
      return {
        ...state,
        updateEmailError: action.err
    }
    default:
      return state
  }
};

export default combineReducers({
  user: userReducer,
});