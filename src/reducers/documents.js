export function listDocs(state = [], action) {
  console.log("listDocs>> action.type: " + action.type + " action: " + JSON.stringify(action))
  switch (action.type) {
    case 'DOCS_LIST':
      return action.docsList;
    default:
      return state
  }
}

export function docsFilterChange(state = null, action) {
  console.log("docsFilterChange>> action.type: " + action.type + " action.filter: " + JSON.stringify(action.docsFilter))
  switch (action.type) {
    case 'DOCS_FILTER_CHANGE':
      return action.docsFilter
    default:
      return state
  }
}
