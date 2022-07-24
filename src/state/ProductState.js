import React, { useReducer } from 'react'
import ProductContext from "../context/ProductContext"
import ProductReducer from "../reducer/ProductReducer"
import db from "../firebase/firebaseConfig"

const ProductState = ({children}) => {
  const initialState = {
    products: [],
    product: {}
  }

  const [state, productDispatch] = useReducer(ProductReducer, initialState)

  const getProducts = () => {
    db.ref("products").once("value")
    .then((snapshot) => {
        const products = []
        snapshot.forEach(product => {
          products.push({
            id: product.key,
            ...product.val()
          })
        })
        productDispatch({
          type: "GET_PRODUCTS",
          products: products
        })
      }).catch(err => console.log("getProducts hatası: " + err))
  }

  const getProductById = (productId) => {
    db.ref(`products/${productId}`)
      .once("value")
      .then((snapshot) => {
        let product = {
          id: snapshot.key,
          ...snapshot.val()
        }
        productDispatch({
          type: "GET_PRODUCT",
          product: product
        })
      })
      .catch(err => console.log("hata: ", err))
  }


  return (
    <ProductContext.Provider value={{
      products: state.products,
      product: state.product,
      getProducts,  
      getProductById,  
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductState