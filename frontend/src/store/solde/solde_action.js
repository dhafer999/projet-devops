import axios from "axios"
import { SOLDEFAIL, SOLDELOAD, LISTSOLDESUCC, LISTMYSOLDESUCC } from "./solde_Type_Action"

export const addSolde = Solde => async dispatch => {
  dispatch({ type: SOLDELOAD })
  try {
    const result = await axios.post(
      "https://test-conge.herokuapp.com/api/Solde/add",
      Solde
    )
    dispatch({ type: LISTSOLDESUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: SOLDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
export const getallSolde = () => async dispatch => {
  dispatch({ type: SOLDELOAD })
  try {
    const result = await axios.get("https://test-conge.herokuapp.com/api/Solde/getSoldes")
    dispatch({ type: LISTSOLDESUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: SOLDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
export const getallSoldeByUser = (username) => async dispatch => {
  dispatch({ type: SOLDELOAD })
  try {
    var user=username
    if (username===undefined){
      const gt = JSON.parse(localStorage.getItem('user'))
      console.log("🚀 ~ file: solde_action.js ~ line 38 ~ gt", gt)
      user=gt.username
    }
    console.log('user ',user)
    const result = await axios.get(`https://test-conge.herokuapp.com/api/Solde/getSoldesByUser/${user}`)
    console.log("🚀 ~ file: solde_action.js ~ line 36 ~ result", result)
    dispatch({ type: LISTMYSOLDESUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: SOLDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const updateSolde = Solde => async dispatch => {
  dispatch({ type: SOLDELOAD })
  try {
    const result = await axios.put(
      "https://test-conge.herokuapp.com/api/Solde/update",
      Solde
    )
    dispatch({ type: LISTSOLDESUCC, payload: [] })
    window.alert("enregistrer avec succ ")
  } catch (error) {
    dispatch({ type: SOLDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const deleteSolde = Solde => async dispatch => {
    console.log(Solde)
  dispatch({ type: SOLDELOAD })
  try {
    const result = await axios.delete(
      `https://test-conge.herokuapp.com/api/Solde/delete/${Solde._id}`
    )
    dispatch({ type: LISTSOLDESUCC, payload: [] })
    window.alert("supprimer avec succ ")
  } catch (error) {
    dispatch({ type: SOLDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
