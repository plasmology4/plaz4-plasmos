export function listNews(state = [], action) {
  console.log("listNews>> action.type: " + action.type + " action: " + JSON.stringify(action))
  switch (action.type) {
    case 'NEWS_LIST':
      return action.newsList;
    default:
      return state
  }
}

export function newsFilterChange(state = null, action) {
  console.log("newsFilterChange>> action.type: " + action.type + " action.newsFilter: " + JSON.stringify(action.newsFilter))
  switch (action.type) {
    case 'NEWS_FILTER_CHANGE':
      return action.newsFilter
    default:
      return state
  }
}
