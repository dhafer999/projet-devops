import {
  SOLDEFAIL,
  SOLDELOAD,
  SOLDESUCC,
  LISTSOLDESUCC,
  LISTMYSOLDESUCC
} from "./solde_Type_Action"

const initState = {
  listAll: [],
  listMySolde: [],
  solde: [],
  error: [],
  load: false,
}

export const Solde_reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SOLDELOAD:
      return { ...state, load: true }

    case SOLDESUCC:
      return { ...state, load: false, solde: payload }

    case LISTSOLDESUCC:
      return { ...state, load: false, listAll: payload }
    case LISTMYSOLDESUCC:
      return { ...state, load: false, listMySolde: payload }
    case SOLDEFAIL:
      return { ...state, load: false, error: payload }
    default:
      return { ...state }
  }
}

export default Solde_reducer
