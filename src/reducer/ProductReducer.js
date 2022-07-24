const ProductReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.products
      }  
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.product
      }
  
    default:
      return state
  }
}

export default ProductReducer