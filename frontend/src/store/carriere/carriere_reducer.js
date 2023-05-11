import {
  CARRIEREFAIL,
  CARRIERELOAD,
  CARRIERESUCC,
  LISTCARRIERESUCC,

} from "./carriere_Type_Action"

const initState = {
  listAll: [],
  carriere: [],
  error: [],
  load: false,
}

export const Carriere_reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case CARRIERELOAD:
      return { ...state, load: true }

    case CARRIERESUCC:
      return { ...state, load: false, carriere: payload }

    case LISTCARRIERESUCC:
      return { ...state, load: false, listAll: payload }
   
    case CARRIEREFAIL:
      return { ...state, load: false, error: payload }
    default:
      return { ...state }
  }
}

export default Carriere_reducer
