import React, { useReducer } from 'react'
import CategoryContext from "../context/CategoryContext"
import CategoryReducer from "../reducer/CategoryReducer"
import db from "../firebase/firebaseConfig"

const CategoryState = ({children}) => {
  const initialState = {
    categories: [],
    category: {}
  }

  const [state, categoryDispatch] = useReducer(CategoryReducer, initialState)

  const getCategories = () => {
    db.ref("categories")
      .once("value")
      .then((snapshot) => {
        const categories = []
        snapshot.forEach(category => {
          categories.push({
            id: category.key,
            ...category.val()
          })
        })
        categoryDispatch({
          type: "GET_CATEGORIES",
          categories: categories
        })
      })
      .catch(err => console.log("hata: ", err))
  }

  const getCategoryById = (categoryId) => {
    db.ref(`categories/${categoryId}`)
      .once("value")
      .then((snapshot) => {
        let category = {
          id: snapshot.key,
          ...snapshot.val()
        }
        categoryDispatch({
          type: "GET_CATEGORY",
          category: category
        })
      })
      .catch(err => console.log("hata: ", err))
  }

  return (
    <CategoryContext.Provider value={{
      categories: state.categories,
      category: state.category,
      getCategories,
      getCategoryById,
    }}>
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryState