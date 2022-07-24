import React, { useReducer } from 'react'
import UserReducer from '../reducer/UserReducer'
import UserContext from '../context/UserContext'
import db from "../firebase/firebaseConfig"

const UserState = ({children}) => {
  const initialState = {
    users: [],
    user: {},
    loggedUser: null
  }

  const [state, userDispatch] = useReducer(UserReducer, initialState)

  

  const getLogged = () => {
    const uuid = JSON.parse(localStorage.getItem("uuid"))
    if(uuid){
      db.ref(`users/${uuid}`).once("value")
      .then((snapshot) => {
        if(snapshot.val() !== null){
          userDispatch({
            type: "GET_LOGGED",
            loggedUser: {
              id: uuid,
              ...snapshot.val()
            }
          })
        }
      }).catch(err => {
        console.log("htı" + err)
      })
    }
  }

  const logged = (newUser) => {
    userDispatch({
      type: "LOGGED",
      loggedUser: newUser
    })

    localStorage.setItem("uuid", JSON.stringify(newUser.id))
    localStorage.setItem("username", JSON.stringify(newUser.username))
  }

  const logoutUser = () => {
    userDispatch({
      type: "LOGOUT",
      loggedUser: null
    })

    localStorage.removeItem("uuid")
    localStorage.removeItem("username")
  }

  return (
    <UserContext.Provider value={{
      users: state.users,
      user: state.user,
      loggedUser: state.loggedUser,
      getLogged,
      logged,
      logoutUser,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserState