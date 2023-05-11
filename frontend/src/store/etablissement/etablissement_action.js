import axios from "axios"
import {
  ETABLISSEMENTFAIL,
  ETABLISSEMENTLOAD,
  ETABLISSEMENTSUCC,
  LISTETABLISSEMENTSUCC,
} from "./etablissement_Type_Action"

export const addetablissement = etablissement => async dispatch => {
  dispatch({ type: ETABLISSEMENTLOAD })
  try {
    await axios.post("https://test-conge.herokuapp.com/api/etablissement/add", etablissement)
    dispatch({ type: LISTETABLISSEMENTSUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: ETABLISSEMENTFAIL, payload: error })
    window.alert("operation échouée ")
    console.log(error)
  }
}

export const getalletablissement = () => async dispatch => {
  dispatch({ type: ETABLISSEMENTLOAD })
  try {
    const result = await axios.get(
      "https://test-conge.herokuapp.com/api/etablissement/getetablissements"
    )
    dispatch({ type: LISTETABLISSEMENTSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: ETABLISSEMENTFAIL, payload: error })
    window.alert("operation échouée ")
    console.log(error)
  }
}
export const getOneetablissement = (nom) => async dispatch => {
  dispatch({ type: ETABLISSEMENTLOAD })
  try {
    const result = await axios.get(
      `https://test-conge.herokuapp.com/api/etablissement/getone/${nom}`
    )
    dispatch({ type: ETABLISSEMENTSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: ETABLISSEMENTFAIL, payload: error })
    window.alert("operation échouée ")
    console.log(error)
  }
}

export const updateetablissement = etablissement => async dispatch => {
  console.log(
    "🚀 ~ file: etablissement_action.js ~ line 105 ~ etablissement",
    etablissement
  )
  dispatch({ type: ETABLISSEMENTLOAD })
  try {
    await axios.put("https://test-conge.herokuapp.com/api/etablissement/update", etablissement)
    dispatch({ type: LISTETABLISSEMENTSUCC, payload: [] })
    window.alert("mise à jour avec succ ")
  } catch (error) {
    dispatch({ type: ETABLISSEMENTFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const deleteetablissement = etablissement => async dispatch => {
  console.log(etablissement)
  dispatch({ type: ETABLISSEMENTLOAD })
  try {
    await axios.delete(
      `https://test-conge.herokuapp.com/api/etablissement/delete/${etablissement._id}`
    )
    dispatch({ type: LISTETABLISSEMENTSUCC, payload: [] })
    window.alert("supprimer avec succ ")
  } catch (error) {
    dispatch({ type: ETABLISSEMENTFAIL, payload: error })
    window.alert("operation échouée ")
    console.log(error)
  }
}



