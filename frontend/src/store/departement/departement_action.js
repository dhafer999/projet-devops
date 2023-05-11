import axios from "axios"
import {
  DEPARTEMENTFAIL,
  DEPARTEMENTLOAD,
  LISTDEPARTEMENTSUCC,
} from "./departement_Type_Action"

export const adddepartement = departement => async dispatch => {
  dispatch({ type: DEPARTEMENTLOAD })
  try {
    await axios.post("https://test-conge.herokuapp.com/api/departement/add", departement)
    dispatch({ type: LISTDEPARTEMENTSUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: DEPARTEMENTFAIL, payload: error })
    window.alert("operation échouée le nom existe déja !! ")
    console.log(error)
  }
}

export const getalldepartement = () => async dispatch => {
  dispatch({ type: DEPARTEMENTLOAD })
  try {
    const result = await axios.get(
      "https://test-conge.herokuapp.com/api/departement/getdepartements"
    )
    dispatch({ type: LISTDEPARTEMENTSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: DEPARTEMENTFAIL, payload: error })
    window.alert("operation échouée ")
    console.log(error)
  }
}

export const updatedepartement = departement => async dispatch => {
  console.log(
    "🚀 ~ file: departement_action.js ~ line 105 ~ departement",
    departement
  )
  dispatch({ type: DEPARTEMENTLOAD })
  try {
    await axios.put("https://test-conge.herokuapp.com/api/departement/update", departement)
    dispatch({ type: LISTDEPARTEMENTSUCC, payload: [] })
    window.alert("mise à jour avec succ ")
  } catch (error) {
    dispatch({ type: DEPARTEMENTFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const deletedepartement = departement => async dispatch => {
  console.log(departement)
  dispatch({ type: DEPARTEMENTLOAD })
  try {
    await axios.delete(
      `https://test-conge.herokuapp.com/api/departement/delete/${departement._id}`
    )
    dispatch({ type: LISTDEPARTEMENTSUCC, payload: [] })

    window.alert("supprimer avec succ ")
  } catch (error) {
    dispatch({ type: DEPARTEMENTFAIL, payload: error })
    window.alert("operation échouée ")
    console.log(error)
  }
}
