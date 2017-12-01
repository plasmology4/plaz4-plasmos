export function listDocs(state = [], action) {
  switch (action.type) {
    case 'DOCS_LIST':
      return action.docsList;
    default:
      return state
  }
}

export function docsFilterChange(state = null, action) {
  switch (action.type) {
    case 'DOCS_FILTER_CHANGE':
      return action.docsFilter
    default:
      return state
  }
}
