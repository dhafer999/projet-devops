import {
  CONGEFAIL,
  CONGELOAD,
  CONGESUCC,
  LISTCONGESUCC,
} from "./conge_Type_Action"

const initState = {
  listAll: [],
  conge: [],
  error: [],
  load: false,
}

export const Conge_reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case CONGELOAD:
      return { ...state, load: true }

    case CONGESUCC:
      return { ...state, load: false, conge: payload }

    case LISTCONGESUCC:
      return { ...state, load: false, listAll: payload }
    case CONGEFAIL:
      return { ...state, load: false, error: payload }
    default:
      return { ...state }
  }
}

export default Conge_reducer
