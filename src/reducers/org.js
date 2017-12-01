
export function orgData(state = [], action) {
  switch (action.type) {
    case 'ORGS_CHANGE': 
      return action.orgs;
    case 'ADD_NEW_ORG': 
      var newArray = [
        ...state.slice(0, action.index),
        action.org
      ];
      
      return newArray;
    default:
      return state
  }
}

export function orgUserData(state = [], action) {
  switch (action.type) {
    case 'ORG_USER_CHANGE': 
      return action.orgUsers;
    // case 'ADD_NEW_ORG_USER': 
    //   console.log("action.org="+action.org);
    //   var newArray = [
    //     ...state.slice(0, action.index),
    //     action.org
    //   ];
      
    //   return newArray;
    default:
      return state
  }
}

export function orgStatus(state = null, action) {
  switch (action.type) {
    case 'ORG_API_CALL_STATUS':
      return action.status
    default:
      return state
  }
}