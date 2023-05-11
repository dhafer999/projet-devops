import axios from "axios"
import { JOURFAIL, JOURLOAD, LISTJOURSUCC } from "./jour_type_actions"

export const addJOUR = JOUR => async dispatch => {
  dispatch({ type: JOURLOAD })
  try {
    const result = await axios.post(
      "https://test-conge.herokuapp.com/api/jour/add",
      JOUR
    )
    dispatch({ type: LISTJOURSUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: JOURFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
export const getallJOUR = () => async dispatch => {
  dispatch({ type: JOURLOAD })
  try {
    const result = await axios.get("https://test-conge.herokuapp.com/api/jour/getjours")
    dispatch({ type: LISTJOURSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: JOURFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const updateJOUR = JOUR => async dispatch => {
  dispatch({ type: JOURLOAD })
  try {
    const result = await axios.put(
      "https://test-conge.herokuapp.com/api/jour/update",
      JOUR
    )
    dispatch({ type: LISTJOURSUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: JOURFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const deleteJOUR = JOUR => async dispatch => {
    console.log(JOUR)
  dispatch({ type: JOURLOAD })
  try {
    const result = await axios.delete(
      `https://test-conge.herokuapp.com/api/jour/delete/${JOUR._id}`
    )
    dispatch({ type: LISTJOURSUCC, payload: [] })
    window.alert("supprimer avec succ ")
  } catch (error) {
    dispatch({ type: JOURFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
