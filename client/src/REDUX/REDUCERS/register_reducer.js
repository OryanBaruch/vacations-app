
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../ACTIONS/types'

export const reducerRegister=(state={} ,action)=>{
    const {type, payload}=action
    switch (type) {
        case REGISTER_SUCCESS:
               state=payload
               return state
        
        case REGISTER_FAIL:
            return state
        default:
            return state
    }
}

export default reducerRegister