
export function userData(state = [], action) {
  console.log("userData>> action.type: " + action.type + " action: " + JSON.stringify(action))
  switch (action.type) {
    case 'USERS_CHANGE': 
      console.log("action.users="+action.users);
      return action.users;
    case 'ADD_NEW_USER': 
      console.log("action.user="+action.user);
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
  console.log("userUserData>> action.type: " + action.type + " action: " + JSON.stringify(action))
  switch (action.type) {
    case 'USERS_CHANGE': 
      console.log("action.users="+action.users);
      return action.users;
    case 'ADD_NEW_USER': 
      console.log("action.user="+action.user);
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
  console.log("userStatus>> action.type: " + action.type + " action.status: " + JSON.stringify(action.status))
  switch (action.type) {
    case 'USER_API_CALL_STATUS':
      return action.status
    default:
      return state
  }
}



