
import { NO_USER, USER_FETCHED, USER_LOADING } from "../constants";

export const userReducer = (state={user:null},action)=>{
    switch (action.type) {
        case USER_LOADING:
            return{
                loading:true,
                user:null
            }
        case USER_FETCHED:
            return{
                loading:false,
                user:action.payload
            }
        case NO_USER:
            return{
                loading:false,
                user:null
            }
           
    
        default:
           return state;
    }
}