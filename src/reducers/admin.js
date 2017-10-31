

export function listUsers(state = [], action) {
  console.log("listUsers>> action.type: " + action.type + " action: " + JSON.stringify(action))
  switch (action.type) {
    case 'USER_LIST':
      return action.userList;
    default:
      return state
  }
}

export function editUser(state = {}, action) {
  console.log("user>> action.type: " + action.type + " action: " + JSON.stringify(action))
console.log("Initial state is:"+JSON.stringify(state));

  switch (action.type) {
    case 'USER_CHANGE':
      let user = (state)?{...state.user}:{};
console.log("Before user is:"+JSON.stringify(user));

      user[action.id]= action.value;

console.log("After user is:"+JSON.stringify(user));
console.log("State  is:"+JSON.stringify(state));


      let newState = {
        ...state,
        user
      }

      console.log("newState:"+JSON.stringify(newState));
      return newState;
    case 'SET_USER':
      return action.user;
    default:
      return state
  }
}

export function setUser(state = {}, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state
  }
}

export function filterChange(state = null, action) {
  console.log("filterChange>> action.type: " + action.type + " action.filter: " + JSON.stringify(action.filter))
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.filter
    default:
      return state
  }
}
