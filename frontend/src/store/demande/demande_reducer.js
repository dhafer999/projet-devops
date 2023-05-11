import {
  DEMANDEFAIL,
  DEMANDELOAD,
  DEMANDESUCC,
  LISTDEMANDESUCC,
  LISTDEMANDEADSUCC,
  LISTDEMANDEMASUCC,
  LISTDEMANDEMYSUCC
} from "./demande_Type_Action"

const initState = {
  listAll: [],
  listAllAd: [],
  listAllMa: [],
  listAllMy: [],
  demande: [],
  error: [],
  load: false,
}

export const Demande_reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case DEMANDELOAD:
      return { ...state, load: true }

    case DEMANDESUCC:
      return { ...state, load: false, demande: payload }

    case LISTDEMANDESUCC:
      return { ...state, load: false, listAll: payload }
    case LISTDEMANDEADSUCC:
      return { ...state, load: false, listAllAd: payload }
    case LISTDEMANDEMASUCC:
      return { ...state, load: false, listAllMa: payload }
    case LISTDEMANDEMYSUCC:
      return { ...state, load: false, listAllMy: payload }
    case DEMANDEFAIL:
      return { ...state, load: false, error: payload }
    default:
      return { ...state }
  }
}

export default Demande_reducer
