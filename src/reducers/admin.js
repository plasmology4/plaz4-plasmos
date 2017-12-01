

export function listUsers(state = [], action) {
  switch (action.type) {
    case 'USER_LIST':
      return action.userList;
    default:
      return state
  }
}

export function editUser(state = {}, action) {
  switch (action.type) {
    case 'USER_CHANGE':
      let user = (state)?{...state.user}:{};

      user[action.id]= action.value;

      let newState = {
        ...state,
        user
      }
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
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.filter
    default:
      return state
  }
}
