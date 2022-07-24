import React, { useReducer } from 'react'
import CartContext from "../context/CartContext"
import CartReducer from "../reducer/CartReducer"
import db from "../firebase/firebaseConfig"

const CartState = ({children}) => {
  const initialState = {
    userCartProducts: [],
    totalPrice: 0,
    totalCount: 0
  }

  const [state, cartDispatch] = useReducer(CartReducer, initialState)

  const getUserCartProducts = () => {
    const uuid = JSON.parse(localStorage.getItem("uuid"))
    if(uuid){
      db.ref(`baskets/${uuid}`).once("value")
      .then(snapshot => {
        const basket = []
        snapshot.forEach(item => {
          basket.push({
            basket_id: item.key,
            ...item.val()
          })
        })

        const userCartProducts = []
        basket.map(userCartProduct => {
          db.ref(`products/${userCartProduct.product_id}`).once("value")
          .then(res => {
            userCartProducts.push({
              basket_id: userCartProduct.basket_id,
              product_id: res.key,
              count: userCartProduct.count,
              ...res.val()
            })
            cartDispatch({
              type: "GET_USER_CART_PRODUCTS",
              userCartProducts: userCartProducts
            })

            getUserCartProductsTotalPrice(userCartProducts)
            getTotalCount(userCartProducts)
          }).catch(err => console.log("basket.map hatası: " + err))
        })
      }).catch(err => console.log("getUserCartProducts hata: " + err))
    }
  }

  const getUserCartProductsTotalPrice = (products) => {
    let total = 0
    products.map(item => {
      total += item.price * item.count
      cartDispatch({
        type: "GET_TOTAL_PRICE",
        totalPrice: total
      })
    })
  }

  const getTotalCount = (products) => {
    let count = 0
    products.map(item => {
      count += item.count
      cartDispatch({
        type: "GET_TOTAL_COUNT",
        totalCount: count
      })
    })

  }

  const logoutCart = () => {
    cartDispatch({
      type: "LOGOUT_CART",
      userCartProducts: [],
      totalPrice: 0,
      totalCount: 0,
    })

    getUserCartProducts()
  }

  return (
    <CartContext.Provider value={{
      userCartProducts: state.userCartProducts,
      totalPrice: state.totalPrice,
      totalCount: state.totalCount,
      getUserCartProducts,
      logoutCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartState