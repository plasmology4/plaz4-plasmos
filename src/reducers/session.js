// The redux reducer function for the logged in state.
export function loginHasErrored(state = false, action) {
  switch (action.type) {
    case 'LOGIN_HAS_ERRORED':
      return action.hasErrored
    default:
      return state
  }
}

export function loginIsPending(state = false, action) {
  switch (action.type) {
    case 'LOGIN_IS_PENDING':
      return action.isPending
    default:
      return state
  }
}

export function userInfo(state = null, action) {
  switch (action.type) {
    case 'USER_INFO':
      return action.userInfo
    default:
      return state
  }
}

export function userIsAdmin(state = false, action) {
  switch (action.type) {
    case 'USER_IS_ADMIN':
      return action.userIsAdmin
    default:
      return state
  }
}

export function sessionChange(state = null, action) {
  switch (action.type) {
    case 'SESSION_CHANGE':
      return action.session
    case 'SESSION_SIGN_OUT':
      return null
    default:
      return state
  }
}
