import axios from "axios"
import { CONGEFAIL, CONGELOAD, LISTCONGESUCC } from "./conge_Type_Action"

export const addConge = conge => async dispatch => {
  dispatch({ type: CONGELOAD })
  try {
    const result = await axios.post(
      "https://test-conge.herokuapp.com/api/conge/add",
      conge
    )
    dispatch({ type: LISTCONGESUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: CONGEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
export const getallConge = () => async dispatch => {
  dispatch({ type: CONGELOAD })
  try {
    const result = await axios.get("https://test-conge.herokuapp.com/api/conge/getconges")
    dispatch({ type: LISTCONGESUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: CONGEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const updateConge = conge => async dispatch => {
  dispatch({ type: CONGELOAD })
  try {
    const result = await axios.put(
      "https://test-conge.herokuapp.com/api/conge/update",
      conge
    )
    dispatch({ type: LISTCONGESUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: CONGEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const deleteConge = conge => async dispatch => {
    console.log(conge)
  dispatch({ type: CONGELOAD })
  try {
    const result = await axios.delete(
      `https://test-conge.herokuapp.com/api/conge/delete/${conge._id}`
    )
    dispatch({ type: LISTCONGESUCC, payload: [] })
    window.alert("supprimer avec succ ")
  } catch (error) {
    dispatch({ type: CONGEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
