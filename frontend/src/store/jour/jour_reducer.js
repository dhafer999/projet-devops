import {
    JOURFAIL,
    JOURLOAD,
    JOURSUCC,
    LISTJOURSUCC,
  } from "./jour_type_actions"
  
  const initState = {
    listAll: [],
    jour: [],
    error: [],
    load: false,
  }
  
  export const Jour_reducer = (state = initState, { type, payload }) => {
    switch (type) {
      case JOURLOAD:
        return { ...state, load: true }
  
      case JOURSUCC:
        return { ...state, load: false, jour: payload }
  
      case LISTJOURSUCC:
        return { ...state, load: false, listAll: payload }
      case JOURFAIL:
        return { ...state, load: false, error: payload }
      default:
        return { ...state }
    }
  }
  
  export default Jour_reducer
  