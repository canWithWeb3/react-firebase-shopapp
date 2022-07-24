const CategoryReducer = (state, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.categories
      }
    case "GET_CATEGORY":
      return {
        ...state,
        category: action.category
      }
  
    default:
      return state
  }
}

export default CategoryReducer