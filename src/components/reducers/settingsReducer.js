import { ALLOW_REGISTRATIONS, DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT } from "../../actions/types";


export default function(state = {}, action){
    switch(action.type){
        case DISABLE_BALANCE_ON_EDIT:
            return{
                ...state,
                disableBalanceOnEdit: action.payload
            }
        case DISABLE_BALANCE_ON_ADD:
            return{
                ...state,
                disableBalanceOnAdd: action.payload
            }
        case ALLOW_REGISTRATIONS:
            return{
                ...state,
                allowRegistration: action.payload
            }
        default:
            return state
    }
}
