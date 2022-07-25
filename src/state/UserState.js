import React, { useReducer } from 'react'
import UserReducer from '../reducer/UserReducer'
import UserContext from '../context/UserContext'
import db, { auth, googleAuthProvider } from "../firebase/firebaseConfig"

const UserState = ({children}) => {
  
  const initialState = {
    users: [],
    user: {},
    loggedUser: null
  }

  const [state, userDispatch] = useReducer(UserReducer, initialState)

  const googleLogin = () => {
    return auth.signInWithPopup(googleAuthProvider)
      .then(res => {
        db.ref("users").once("value")
        .then(snapshot => {
          const users = []
          snapshot.forEach(user => {
            users.push({ id: user.key, ...user.val() })
          })

          let existUser = null
          users.forEach(user => {
            if(user.email === res.user.email){
              existUser = user
            }
          })

          const username = res.user.displayName.split(" ")
          if(existUser === null){
            db.ref("users").push({
              username: username[0],
              email: res.user.email,
              type: "user"
            }).then(addedUser => {
              const newUser = {
                id: addedUser.key,
                username: username[0],
                email: res.user.email,
                type: "user"
              }
              logged(newUser)
            })
          }else{
            logged(existUser)
          }

        })
      })
      .catch(err => console.log(err));
  }

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
      googleLogin,
      getLogged,
      logged,
      logoutUser,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserState