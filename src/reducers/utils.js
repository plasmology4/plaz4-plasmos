export function isBusy(state = false, action) {
  switch (action.type) {
    case 'API_CALL_BUSY':
      return action.isBusy
    default:
      return state
  }
}

export function hasErrored(state = false, action) {
  switch (action.type) {
    case 'HAS_ERRORED':
      return action.hasErrored
    default:
      return state
  }
}
