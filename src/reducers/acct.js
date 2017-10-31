export function accountsData(state = [], action) {
  console.log("accountData>> action.type: " + action.type + " action: " + JSON.stringify(action))
  switch (action.type) {
    case 'ACCOUNTS_CHANGE': 
      console.log("action.accounts="+action.accounts);
      return action.accounts;
    case 'ADD_NEW_ACCOUNT': 
      console.log("action.account="+action.account);
      var newArray = [
        ...state.slice(0, action.index),
        action.account
      ];
      
      return newArray;
    default:
      return state
  }
}