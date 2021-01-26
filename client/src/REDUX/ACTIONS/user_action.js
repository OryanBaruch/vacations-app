import { USER_SUCCESS, USER_LOGOUT} from "./types";

export const user_logout = (history, dispatch) => {
  localStorage.removeItem("Token");
  localStorage.removeItem("User-Info");
  dispatch({
    type: USER_LOGOUT,
  });
  history.push("/login");
};

export const user_action = (username, password, history) => async (
  dispatch
) => {
  const URL = `http://localhost:5000/login`;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const data = await res.json();
  const { token, results } = data;
  localStorage.setItem("Token", token);
  localStorage.setItem("User-Info", JSON.stringify(results));
  if (data.err) {
    return alert("Wrong username/password");
  } else {
    dispatch({
      type: USER_SUCCESS,
      payload: data.results,
    });
    history.push("/vacations");
  }
};

