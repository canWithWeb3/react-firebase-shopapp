const CartReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_CART_PRODUCTS":
      return {
        ...state,
        userCartProducts: action.userCartProducts
      }      
    case "GET_TOTAL_PRICE":
      return {
        ...state,
        totalPrice: action.totalPrice
      }
    case "GET_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.totalCount
      }
    case "LOGOUT_CART":
      return {
        ...state,
        userCartProducts: action.userCartProducts,
        totalPrice: action.totalPrice,
        totalCount: action.totalCount,
      }
  
    default:
      return state
  }
}

export default CartReducer