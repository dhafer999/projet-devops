import axios from "axios"
import {
  CARRIEREFAIL,
  CARRIERELOAD,
  LISTCARRIERESUCC,
} from "./carriere_Type_Action"

export const addcarriere = carriere => async dispatch => {
  dispatch({ type: CARRIERELOAD })
  try {
    await axios.post("https://test-conge.herokuapp.com/api/carriere/add", carriere)
    dispatch({ type: LISTCARRIERESUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: CARRIEREFAIL, payload: error })
    window.alert("operation échouée employer existe ")
    console.log(error)
  }
}

export const getallcarriere = () => async dispatch => {
  dispatch({ type: CARRIERELOAD })
  try {
    const result = await axios.get(
      "https://test-conge.herokuapp.com/api/carriere/getcarrieres"
    )
    dispatch({ type: LISTCARRIERESUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: CARRIEREFAIL, payload: error })
    window.alert("operation échouée ")
    console.log(error)
  }
}

export const updatecarriere = carriere => async dispatch => {
  console.log(
    "🚀 ~ file: carriere_action.js ~ line 105 ~ carriere",
    carriere
  )
  dispatch({ type: CARRIERELOAD })
  try {
    await axios.put("https://test-conge.herokuapp.com/api/carriere/update", carriere)
    dispatch({ type: LISTCARRIERESUCC, payload: [] })
    window.alert("mise à jour avec succ ")
  } catch (error) {
    dispatch({ type: CARRIEREFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const deletecarriere = carriere => async dispatch => {
  console.log(carriere)
  dispatch({ type: CARRIERELOAD })
  try {
    await axios.delete(
      `https://test-conge.herokuapp.com/api/carriere/delete/${carriere._id}`
    )
    dispatch({ type: LISTCARRIERESUCC, payload: [] })
    window.alert("supprimer avec succ ")
  } catch (error) {
    dispatch({ type: CARRIEREFAIL, payload: error })
    window.alert("operation échouée ")
    console.log(error)
  }
}
