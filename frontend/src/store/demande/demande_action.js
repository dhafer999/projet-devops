import axios from "axios"
import { parseInt } from "lodash"
import {
  DEMANDEFAIL,
  DEMANDELOAD,
  LISTDEMANDEADSUCC,
  LISTDEMANDESUCC,
  LISTDEMANDEMASUCC,
  LISTDEMANDEMYSUCC,
} from "./demande_Type_Action"

export const adddemande = demande => async dispatch => {
  dispatch({ type: DEMANDELOAD })

  const solde = await axios.get(
    `https://test-conge.herokuapp.com/api/Solde/getSoldesByUser/${demande.idEmploye}/${demande.idConge}`
  )

  if (solde.data.length) {
    const newSolde = solde.data[0]

    if (eval(`${newSolde.nbJours}-${demande.nbJours}`) < 0) {
      return window.alert("vous avez plus de solde suffisant")
    } else {
      newSolde["nbJours"] = eval(`${newSolde.nbJours}-${demande.nbJours}`)

      try {
        await axios.post("https://test-conge.herokuapp.com/api/demande/add", demande)

        await axios.put("https://test-conge.herokuapp.com/api/Solde/update", newSolde)

        dispatch({ type: LISTDEMANDEADSUCC, payload: [] })
        dispatch({ type: LISTDEMANDEMASUCC, payload: [] })
        dispatch({ type: LISTDEMANDEMYSUCC, payload: [] })

        window.alert("enregistrer avec succ ")
      } catch (error) {
        dispatch({ type: DEMANDEFAIL, payload: error })
        window.alert("operation échouée ")

        console.log(error)
      }
    }
  } else {
    dispatch({ type: DEMANDEFAIL, payload: "error" })
    window.alert("type de conge non authoriser  ")
  }
}
export const getalldemande = () => async dispatch => {
  dispatch({ type: DEMANDELOAD })
  try {
    const result = await axios.get(
      "https://test-conge.herokuapp.com/api/demande/getdemandes"
    )
    dispatch({ type: LISTDEMANDESUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: DEMANDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
export const getalldemandeAd = () => async dispatch => {
  dispatch({ type: DEMANDELOAD })
  try {
    const result = await axios.get(
      "https://test-conge.herokuapp.com/api/demande/getdemandesByAdmin"
    )
    dispatch({ type: LISTDEMANDEADSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: DEMANDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
export const getalldemandeMa = user => async dispatch => {
  console.log("🚀 ~ file: demande_action.js ~ line 77 ~ user", user)
  dispatch({ type: DEMANDELOAD })
  try {
    const result = await axios.get(
      `https://test-conge.herokuapp.com/api/demande/getdemandesByManager/${user._id}`
    )
    console.log("🚀 ~ file: demande_action.js ~ line 83 ~ result", result)
    dispatch({ type: LISTDEMANDEMASUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: DEMANDEFAIL, payload: error })

    console.log(error)
  }
}

export const getalldemandeMy = user => async dispatch => {
  dispatch({ type: DEMANDELOAD })
  try {
    const result = await axios.get(
      `https://test-conge.herokuapp.com/api/demande/getdemandesByuser/${user._id}`
    )
    dispatch({ type: LISTDEMANDEMYSUCC, payload: result.data })
  } catch (error) {
    dispatch({ type: DEMANDEFAIL, payload: error })

    console.log(error)
  }
}

export const updatedemande = (demande, ancienSolde) => async dispatch => {
  console.log("🚀 ~ file: demande_action.js ~ line 105 ~ demande", demande)
  dispatch({ type: DEMANDELOAD })
  try {
    if (demande.status === "Refus") {
      const solde = await axios.get(
        `https://test-conge.herokuapp.com/api/Solde/getSoldesByUser/${demande.idEmploye}/${demande.idConge}`
      )

      if (solde.data.length) {
        const newSolde = solde.data[0]

        newSolde["nbJours"] = eval(`${newSolde.nbJours}+${demande.nbJours}`)

        await axios.put("https://test-conge.herokuapp.com/api/Solde/update", newSolde)
      }
    }
    if (demande.status === "Encours") {
      const solde = await axios.get(
        `https://test-conge.herokuapp.com/api/Solde/getSoldesByUser/${demande.idEmploye}/${demande.idConge}`
      )

      if (solde.data.length) {
        const newSolde = solde.data[0]

        let initSolde = newSolde.nbJours + parseInt(ancienSolde)
        newSolde["nbJours"] = initSolde - parseInt(demande.nbJours)
        console.log(
          "🚀 ~ file: demande_action.js ~ line 136 ~ newSolde",
          newSolde
        )

        await axios.put("https://test-conge.herokuapp.com/api/Solde/update", newSolde)
      }
    }

    await axios.put("https://test-conge.herokuapp.com/api/demande/update", demande)

    dispatch({ type: LISTDEMANDEADSUCC, payload: [] })
    dispatch({ type: LISTDEMANDEMASUCC, payload: [] })
    dispatch({ type: LISTDEMANDEMYSUCC, payload: [] })
    window.alert("mise à jour avec succ ")
  } catch (error) {
    dispatch({ type: DEMANDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}

export const deletedemande = demande => async dispatch => {
  console.log(demande)
  dispatch({ type: DEMANDELOAD })
  try {
    const solde = await axios.get(
      `https://test-conge.herokuapp.com/api/Solde/getSoldesByUser/${demande.idEmploye}/${demande.idConge}`
    )

    if (solde.data.length) {
      const newSolde = solde.data[0]
      console.log(
        "🚀 ~ file: demande_action.js ~ line 129 ~ newSolde",
        newSolde
      )

      newSolde["nbJours"] = eval(`${newSolde.nbJours}+${demande.nbJours}`)

      console.log(
        "🚀 ~ file: demande_action.js ~ line 129 ~ newSolde",
        newSolde
      )

      await axios.put("https://test-conge.herokuapp.com/api/Solde/update", newSolde)

      await axios.delete(
        `https://test-conge.herokuapp.com/api/demande/delete/${demande._id}`
      )
      dispatch({ type: LISTDEMANDEADSUCC, payload: [] })
      dispatch({ type: LISTDEMANDEMASUCC, payload: [] })
      dispatch({ type: LISTDEMANDEMYSUCC, payload: [] })
      window.alert("supprimer avec succ ")
    } else {
      dispatch({ type: DEMANDEFAIL, payload: "error" })
      window.alert("type de conge non authoriser  ")
    }
  } catch (error) {
    dispatch({ type: DEMANDEFAIL, payload: error })
    window.alert("operation échouée ")

    console.log(error)
  }
}
