import { LIKE_VACATION, UNFOLLOW} from "./types";
import { fetchVacations } from "./vacation_action";

export const likeVacation = (vacationId) => async (dispatch) => {
  try {
    const URL = `http://localhost:5000/follow/${vacationId}`;
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Token"),
      },
    });
    console.log("vacationId", vacationId);
    dispatch({
      type: LIKE_VACATION,
      payload: vacationId,
    });
    dispatch(fetchVacations());
  } catch (error) {
    console.log(error);
  }
};


export const unFollow = (vacationId) => async (dispatch)=>{
  try {
    const url=`http://localhost:5000/follow/${vacationId}`
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Token"),
      },
    })
    dispatch({
      type: UNFOLLOW,
      payload: vacationId,
    });
    dispatch(fetchVacations());
  } catch (error) {
    console.log('Error in like actions', error)
  }
}