const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_LOGGED":
      return {
        ...state,
        loggedUser: action.loggedUser
      }
    case "LOGGED":
      return {
        ...state,
        loggedUser: action.loggedUser
      }
    case "LOGOUT":
      return {
        ...state,
        loggedUser: action.loggedUser
      }
    
    default:
      return state
  }
}

export default UserReducer