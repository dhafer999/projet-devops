import {
  ETABLISSEMENTFAIL,
  ETABLISSEMENTLOAD,
  ETABLISSEMENTSUCC,
  LISTETABLISSEMENTSUCC,

} from "./etablissement_Type_Action"

const initState = {
  listAll: [],
  etablissement: [],
  error: [],
  load: false,
}

export const Etablissement_reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ETABLISSEMENTLOAD:
      return { ...state, load: true }

    case ETABLISSEMENTSUCC:
      return { ...state, load: false, etablissement: payload }

    case LISTETABLISSEMENTSUCC:
      return { ...state, load: false, listAll: payload }
   
    case ETABLISSEMENTFAIL:
      return { ...state, load: false, error: payload }
    default:
      return { ...state }
  }
}

export default Etablissement_reducer
