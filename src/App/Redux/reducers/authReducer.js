
const INITIAL_STATE = {
    authError: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
        console.log('Login Error')
        return {
            ... state,
            authError: 'Login Failed'
        }
    case 'LOGIN_SUCCESS':
        console.log('Login Success')
        return {
            ...state,
            authError: null
        }
    case 'SIGNUP_ERROR':
        console.log('Sign Up Error')
        return {
            ... state,
            authError: 'Sign Up Failed'
        }
    case 'SIGNUP_SUCCESS':
        console.log('Sign Up Success')
        return {
            ...state,
            authError: null
        }
    case 'LOGOUT_ERROR':
        console.log('Logout Error')
        return {
            ... state,
            authError: 'Logout Error'
        }
    case 'LOGOUT_SUCCESS':
        console.log('Logout Success')
        return {
            ...state,
            authError: null
        }
    case 'RESET_AUTH_ERROR':
        return {
            ...state,
            authError: null
        }
    default:
      return state
  }
};

export default authReducer