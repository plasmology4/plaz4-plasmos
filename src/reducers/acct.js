export function accountsData(state = [], action) {
  switch (action.type) {
    case 'ACCOUNTS_CHANGE': 
      return action.accounts;
    case 'ADD_NEW_ACCOUNT': 
      var newArray = [
        ...state.slice(0, action.index),
        action.account
      ];
      
      return newArray;
    default:
      return state
  }
}