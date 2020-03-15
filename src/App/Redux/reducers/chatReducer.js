
const INITIAL_STATE = {
    chats: [],
    subjects: [],
    courses: []
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_CHAT_SUCCESS':
        console.log('Created Chat: ', action.chatId)
        return state
    case 'CREATE_CHAT_ERROR':
        console.log('Create Chat Error: ', action.err)
        return state
    case 'DELETE_CHAT_SUCCESS':
        console.log('Deleted Chat: ', action.chat)
        return state
    case 'DELETE_CHAT_ERROR':
        console.log('Delete Chat Error: ', action.err)
        return state
    case 'ADD_MESSAGE_SUCCESS':
        console.log('Added message: ', action.message)
        return state
    case 'ADD_MESSAGE_ERROR':
        console.log('Add message error: ', action.err)
        return state
    case 'GET_SUBJECTS_SUCCESS':
        console.log('Add subject success: ', action.subject)
        return {
            ...state,
            subjects: action.subjects
        }
    case 'GET_SUBJECTS_ERROR':
        console.log('Add subject error: ', action.err)
        return state
    case 'GET_COURSES_SUCCESS':
        console.log('Add courses success: ', action.courses)
        return {
            ...state,
            courses: action.courses
        }
    case 'GET_COURSES_ERROR':
        console.log('Add courses error: ', action.err)
        return state
        
    case 'CLEAR_COURSES':
        console.log("CLEARING COURSE DATA")
        return {
            ...state,
            courses: []
        }
    default:
      return state
  }
};

export default chatReducer