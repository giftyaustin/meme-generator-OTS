import { MEMES_FAILED, MEMES_LOADING, MEMES_SUCCESS } from "../constants"

export const memesReducer = (state = {loading:false}, action)=>{
        switch (action.type) {
            case MEMES_LOADING:
                return {
                    loading: true,

                }
            case MEMES_SUCCESS:
                return {
                    loading: false,
                    currMemes:action.payload

                }
            case MEMES_FAILED:
                return {
                    loading: false,

                }
                
                
        
            default:
                return state
        }
}