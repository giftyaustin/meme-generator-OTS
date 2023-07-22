import { NO_USER, USER_FETCHED } from "../store/constants";

export const isAuthorizedUser = async (dispatch) => {
  try {
    const data = { special: "authorizationCheck" };
    const response = await fetch(`${process.env.REACT_APP_CLIENT_URL}/user`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
        
      },
      body: JSON.stringify(data),
    });
  
    const res = await response.json()
    if(res.authorized){
        dispatch({type:USER_FETCHED,payload:res.user})
    }
    else{
      dispatch({type:NO_USER})
    }
    
  } catch (error) {
    console.log(error)
    dispatch({type:NO_USER})
  }
};
