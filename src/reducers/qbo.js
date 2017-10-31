export function qboAuth(state = null, action) {
  console.log("qboAuth>> action.type: " + action.type + " action.qboAuthStatus: " + JSON.stringify(action.qboAuth))
  switch (action.type) {
    case 'QBO_AUTH':
      return action.qboAuth
    case 'QBO_AUTH_CLEAR':
      return null
    default:
      return state
  }
}