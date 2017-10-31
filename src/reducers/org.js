
export function orgData(state = [], action) {
  console.log("orgData>> action.type: " + action.type + " action: " + JSON.stringify(action))
  switch (action.type) {
    case 'ORGS_CHANGE': 
      console.log("action.orgs="+action.orgs);
      return action.orgs;
    case 'ADD_NEW_ORG': 
      console.log("action.org="+action.org);
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
  console.log("orgUserData>> action.type: " + action.type + " action: " + JSON.stringify(action))
  switch (action.type) {
    case 'ORG_USER_CHANGE': 
      console.log("action.orgs="+action.orgs);
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
  console.log("orgStatus>> action.type: " + action.type + " action.status: " + JSON.stringify(action.status))
  switch (action.type) {
    case 'ORG_API_CALL_STATUS':
      return action.status
    default:
      return state
  }
}