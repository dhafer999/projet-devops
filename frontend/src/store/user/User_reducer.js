import {
  LISTUSERSUCC,
  LISTMANAGERSUCC,
  LISTALLSUCC,
  LOGINUSERSUCC,
  USERFAIL,
  USERLOAD,
  USERSUCC,
  EDITUSERSUCC,
  EDITUSERFAIL,
  EDITUERPASSWORDSUCC,
  EDITUSERPASSWORDFAIL,
  DELETEUSERSUCC,
  DELETEUSERFAIL,
  GETONEUSERFAIL,
  GETONEUSERSUCC,
  REGISTERUSER,
  REGISTERUSERFAIL,

} from "./User_type_action"

const initState = {
  listUser: [],
  listManager: [],
  listAll: [],
  user: [],
  error: [],
  load: false,
}

export const User_reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USERLOAD:
      return { ...state, load: true }

    case USERSUCC:
      return { ...state, load: false, user: payload }

    case LOGINUSERSUCC:
      return { ...state, load: false, user: payload }

    case LISTUSERSUCC:
      return { ...state, load: false, listUser: payload }

    case LISTMANAGERSUCC:
      return { ...state, load: false, listManager: payload }

    case LISTALLSUCC:
      return { ...state, load: false, listAll: payload }
    
    case USERFAIL:
      return { ...state, load: false, error: payload }

    case REGISTERUSER:
      return { ...state, load: false, user: payload }

    case REGISTERUSERFAIL:
      return { ...state, load: false, error: payload }

    case DELETEUSERSUCC:
      return { ...state, load: false, user: payload }

    case DELETEUSERFAIL:
      return { ...state, load: false, error: payload }

    case EDITUSERSUCC:
      return { ...state, load: false, user: payload }

    case EDITUSERFAIL:
      return { ...state, load: false, error: payload }

    case EDITUERPASSWORDSUCC:
      return { ...state, load: false, error: payload }

    case EDITUSERPASSWORDFAIL:
      return { ...state, load: false, error: payload }

    case GETONEUSERSUCC:
      return { ...state, load: false, user: payload }

    case GETONEUSERFAIL:
      return { ...state, load: false, error: payload }

    default:
      return { ...state }
  }
}

export default User_reducer
