import {USER_SUCCESS, USER_FAIL, UNREFRESH, USER_LOGOUT} from '../ACTIONS/types'

const userInfo=localStorage.getItem('User-Info')?(JSON.parse(localStorage.getItem('User-Info'))):null

const initialState = {
    userInfo:userInfo,
} 

export const reducerUser=(state=initialState ,action)=>{
  const {type, payload}=action
    switch (type) {
        case USER_SUCCESS:
          return {
            ...state,
            userInfo:payload,
          }
          case USER_FAIL:
            return {
              ...state,
              error:payload
            }
            case UNREFRESH:
              return {
                ...state,
                userInfo:payload
              }
            case USER_LOGOUT: {
              return initialState
            }  
            default:
                return state    
            }
        }


export default reducerUser
