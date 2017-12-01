export function qboAuth(state = null, action) {
  switch (action.type) {
    case 'QBO_AUTH':
      return action.qboAuth
    case 'QBO_AUTH_CLEAR':
      return null
    default:
      return state
  }
}