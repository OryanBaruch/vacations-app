import {
  VACATIONS_SUCCESS,
  VACATIONS_FAIL,
  DELETE_VACATION,
  ADD_VACATION,
  EDIT_VACATION,
  SET_FOLLOWERS,
  FETCH_FOLLOWERS
} from "./types";

export const fetchVacations = () => async (dispatch) => {
  const res = await fetch("http://localhost:5000/vacations", {
    headers: { Authorization: localStorage.getItem("Token") },
  });
  const data = await res.json();
  if (res.status < 400) {
    return dispatch({
      type: VACATIONS_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: VACATIONS_FAIL,
      payload: data,
    });
  }
};

export const handleDelete = (id) => async (dispatch) => {
  const URL = `http://localhost:5000/remove/vacations/${id}`;
  const res = await fetch(URL, {
    method: "DELETE",
    headers: { Authorization: localStorage.getItem("Token") },
  });
  const data = await res.json();
  console.log(data);
  dispatch({
    type: DELETE_VACATION,
    payload: id,
  });
};

export const addVacation = ({
  description,
  destination,
  image,
  starting_date,
  ending_date,
  price,
}) => async (dispatch) => {
  const URL = `http://localhost:5000/vacations`;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Token"),
    },
    body: JSON.stringify({
      description,
      destination,
      image,
      starting_date,
      ending_date,
      price,
    }),
  });
  const data = await res.json();
  dispatch({
    type: ADD_VACATION,
    payload: data,
  });
  console.log("data:", data);
};

export const editVacation = ({
  id,
  description,
  destination,
  image,
  starting_date,
  ending_date,
  price,
}) => async (dispatch) => {
  const URL = `http://localhost:5000/vacations/${id}`;
  const res = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Token"),
    },
    body: JSON.stringify({
      description,
      destination,
      image,
      starting_date,
      ending_date,
      price,
    }),
  });
  const data = await res.json();
  console.log(data);
  dispatch({
    type: EDIT_VACATION,
    payload: {
      id,
      description,
      destination,
      image,
      starting_date,
      ending_date,
      price,
    },
  });
};

export const setFollowers = (id) => async (dispatch) => {
  try {
    const url = `http://localhost:5000/followed-vacations/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Token"),
      },
    });
    const data = await res.json();
    const returnedFollowers = {
      followers: data.FollowedTable.followers,
      id: id,
    };
    dispatch({
      type: SET_FOLLOWERS,
      payload: returnedFollowers,
    });
  } catch (error) {
    console.log("error is:", error);
  }
};

export const fetchAllFollowers = () => async (dispatch) => {
  try {
    const url = `http://localhost:5000/chart/followers`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Token"),
      },
    });
    const data =await res.json();
    console.log('the DATA is', data.chart)
    dispatch({
      type: FETCH_FOLLOWERS,
      payload:data.chart
    });
  } catch (error) {
    console.log({err:error})
  }
};
