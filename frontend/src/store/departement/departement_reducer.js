import {
  DEPARTEMENTFAIL,
  DEPARTEMENTLOAD,
  DEPARTEMENTSUCC,
  LISTDEPARTEMENTSUCC,

} from "./departement_Type_Action"

const initState = {
  listAll: [],
  departement: [],
  error: [],
  load: false,
}

export const Departement_reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case DEPARTEMENTLOAD:
      return { ...state, load: true }

    case DEPARTEMENTSUCC:
      return { ...state, load: false, departement: payload }

    case LISTDEPARTEMENTSUCC:
      return { ...state, load: false, listAll: payload }
   
    case DEPARTEMENTFAIL:
      return { ...state, load: false, error: payload }
    default:
      return { ...state }
  }
}

export default Departement_reducer
