export function listNews(state = [], action) {
  switch (action.type) {
    case 'NEWS_LIST':
      return action.newsList;
    default:
      return state
  }
}

export function newsFilterChange(state = null, action) {
  switch (action.type) {
    case 'NEWS_FILTER_CHANGE':
      return action.newsFilter
    default:
      return state
  }
}
