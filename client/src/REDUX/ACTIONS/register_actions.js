import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

export const register_action = ( firstName, lastname, username, passowrd, history) => async (dispatch)=>{
    const res = await fetch(`http://localhost:5000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name:firstName, last_name:lastname, username:username, password:passowrd }),
    });
    console.log(res.body)
    const data = await res.json();
    console.log(data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });
    dispatch({
      type: REGISTER_FAIL
    });
    if(data.error) return alert('Username already taken, choose a diffrent one');
    if(data.err) return alert('must fill all fields.');
    history.push('/login')
};
