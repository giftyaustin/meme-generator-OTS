const initialState = {
    loginBtnLoading: false,
    generateBtnRedLoading: false,
    guestBtnLoading:false,
    generatedMeme:false,
    authRegisterBtnLoading:false,
    authLoginBtnLoading: false
}


export const btnLoadingReducer = (state=initialState, action)=>{
    const switchKey = 'switchKey'
    switch (switchKey) {
        case 'switchKey':
            return {...state, [action.type]:action.payload}
    
        default:
            return state;
    }
}