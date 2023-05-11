import axios from "axios"


import { fireuser } from "store/actions"
import {
  LISTUSERSUCC,
  LOGINUSERSUCC,
  USERFAIL,
  USERLOAD,
  USERSUCC,
  EDITUSERSUCC,
  EDITUERPASSWORDSUCC,
  EDITUSERPASSWORDFAIL,
  DELETEUSERSUCC,
  GETONEUSERFAIL,
  REGISTERUSER,
  REGISTERUSERFAIL,
  EDITUSERFAIL,
  DELETEUSERFAIL,
  LISTMANAGERSUCC,
  LISTALLSUCC,
} from "./User_type_action"

export const currentUser = () => async dispatch => {
  dispatch({ type: USERLOAD })
  try {
    localStorage.getItem("token")
    // let config1 = {
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    // }
    const res = await axios.get("https://test-conge.herokuapp.com/api/user/current", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })

    const currentUser = {
     
      _id: res.data._id,
      nom: res.data.nom,
      prenom: res.data.prenom,
      email: res.data.email,
      dateNaissance: res.data.dateNaissance,
      adresse: res.data.adresse,
      genre: res.data.genre,
      tel: res.data.tel,
      username: res.data.username,
      role: res.data.role,
      id_manager:res.data.id_manager,
      etablissement:res.data.etablissement

    }

    dispatch({ type: USERSUCC, payload: currentUser })
  } catch (error) {}
}
export const login = (user, history) => async dispatch => {
  dispatch({ type: USERLOAD })
  try {
    const result = await axios.post(
      "https://test-conge.herokuapp.com/api/user/login",
      user
    )
    localStorage.setItem("token", result.data)
    localStorage.setItem("authUser", fireuser)

    dispatch({ type: LOGINUSERSUCC, payload: result.data })
    const res = await axios.get(
      "https://test-conge.herokuapp.com/api/user/current",
      {headers: { authorization: `Bearer ${result.data}` }}
    )

    const currentUser = {
      username: res.data.username,
      name: res.data.name,
      lastName: res.data.lastName,
      numTel: res.data.numTel,
      email: res.data.email,
      address: res.data.address,
      cin: res.data.cin,
      birthday: res.data.birthday,
      id_manager:res.data.id_manager,
      etablissement:res.data.etablissement

    }
    localStorage.setItem("user", JSON.stringify(currentUser))

    dispatch({ type: USERSUCC, payload: currentUser })

      history.push("/dashboard")
      
  } catch (error) {
    dispatch({ type: USERFAIL, payload: error })
    window.alert("nom d'utilisateur ou mot de passe incorrecte ")

    console.log(error)
  }
}

// function to add all users
export const addUser = (user) => async dispatch => {
  console.log("dispatch new user ", user)

 
    dispatch({ type: USERLOAD })

      console.log("add user :: <<<")

      try {
        const result = await axios.post(
          "https://test-conge.herokuapp.com/api/user/register",    user    )

        window.alert("enregistrer avec success  ")

        dispatch({ type: LISTUSERSUCC, payload: [] })
        dispatch({ type: LISTMANAGERSUCC, payload: [] })
        dispatch({ type: LISTALLSUCC, payload: [] })

      
      } catch (error) {
        dispatch({ type: USERFAIL, payload: error })
        window.alert("nom d'utilisateur ou email existe deja ")

        console.log(error)
      }
    
  
}

export const getalluser = () => async dispatch => {
  dispatch({ type: USERLOAD })
  try {
    const result = await axios.get(
      "https://test-conge.herokuapp.com/api/user/getAllUsers"
    )
    dispatch({ type: LISTUSERSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: USERFAIL, payload: error })
    console.log(error)
  }
}

export const getusers = () => async dispatch => {
  dispatch({ type: USERLOAD })
  try {
    const result = await axios.get(
      "https://test-conge.herokuapp.com/api/user/getusers"
    )
    dispatch({ type: LISTUSERSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: USERFAIL, payload: error })
    console.log(error)
  }
}

export const getUserByManager = (user) => async dispatch => {
  dispatch({ type: USERLOAD })
  try {
    const result = await axios.get(
      `https://test-conge.herokuapp.com/api/user/getUsersByManager/${user._id}`
    )

    dispatch({ type: LISTALLSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: USERFAIL, payload: error })
    console.log(error)
  }
}

export const getmanagers = () => async dispatch => {
  dispatch({ type: USERLOAD })
  try {
    const result = await axios.get(
      "https://test-conge.herokuapp.com/api/user/getmanager"
    )
    dispatch({ type: LISTMANAGERSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: USERFAIL, payload: error })
    console.log(error)
  }
}







export const updateuser = (user) => async dispatch => {
  console.log(user)
  dispatch({ type: USERLOAD })
  try {
    await axios.put("https://test-conge.herokuapp.com/api/user/updateUser",user)

    dispatch({ type: LISTUSERSUCC, payload: [] })
    dispatch({ type: LISTMANAGERSUCC, payload: [] })
    dispatch({ type: LISTALLSUCC, payload: [] })
    window.alert("enregistrer avec success  ")

  } catch (error) {
    window.alert("mise ajour non effectuee ")

    console.log(error)
  }
}
export const updateusernameandpassword = () => async dispatch => {
  dispatch({ type: USERLOAD })
  try {
    const result = await axios.put("https://test-conge.herokuapp.com/api/user/one/:_id")
    dispatch({ type: EDITUERPASSWORDSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: EDITUSERPASSWORDFAIL, payload: error })
  }
}
export const deleteuser = user => async dispatch => {
  dispatch({ type: USERLOAD })
  try {

    const result = await axios.delete(
      `https://test-conge.herokuapp.com/api/user/deleteUser/${user._id}`
    )

    dispatch({ type: LISTUSERSUCC, payload: [] })

    window.alert("supprimer avec success  ")

  } catch (error) {
    window.alert("erreur de supprission   ")

  }
}
export const getoneuser = () => {
  async dispatch => {
    dispatch({ type: USERLOAD })
    try {
      const result = await axios.post("https://test-conge.herokuapp.com/api/user/:_id")
      dispatch({ type: GETONEUSERSUCC, payload: result.data })
    } catch (error) {
      dispatch({ type: GETONEUSERFAIL, payload: error })
    }
  }
}


export const lougout = () => async dispatch =>{
  dispatch({ type: LISTUSERSUCC, payload: [] })
  dispatch({ type: LISTMANAGERSUCC, payload: [] })
  dispatch({ type: LISTALLSUCC, payload: [] })
  dispatch({ type: USERSUCC, payload: [] })
  localStorage.removeItem("token")
  localStorage.removeItem("authUser")
  localStorage.clear()
  window.location.href = "/login"
}
