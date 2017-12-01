
export function userData(state = [], action) {
  switch (action.type) {
    case 'USERS_CHANGE': 
      return action.users;
    case 'ADD_NEW_USER': 
      var newArray = [
        ...state.slice(0, action.index),
        action.user
      ];
      
      return newArray;
    default:
      return state
  }
}

export function usersData(state = [], action) {
  switch (action.type) {
    case 'USERS_CHANGE': 
      return action.users;
    case 'ADD_NEW_USER': 
      var newArray = [
        ...state.slice(0, action.index),
        action.user
      ];
      
      return newArray;
    default:
      return state
  }
}

export function userStatus(state = null, action) {
  switch (action.type) {
    case 'USER_API_CALL_STATUS':
      return action.status
    default:
      return state
  }
}



