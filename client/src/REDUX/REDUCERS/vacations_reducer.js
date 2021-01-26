import {
  VACATIONS_SUCCESS,
  VACATIONS_FAIL,
  DELETE_VACATION,
  ADD_VACATION,
  EDIT_VACATION,
  LIKE_VACATION,
  SET_FOLLOWERS,
  UNFOLLOW,
} from "../ACTIONS/types";

const reducerVacations = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case VACATIONS_SUCCESS:
      state = payload;
      return state
      
    case VACATIONS_FAIL:
      return [];

    case DELETE_VACATION:
      console.log(payload);
      const filtered_vacations = state.filter(
        (vacation) => vacation.id !== payload
      );
      return filtered_vacations;

    case ADD_VACATION:
      const addedVacation = state;
      addedVacation.push(payload);
      return addedVacation;

    case EDIT_VACATION:
      const index = state.findIndex((i) => i.id === payload.id);
      state[index] = payload;
      const newState = new Array(...state);
      return newState;

    case LIKE_VACATION:   
      const indexOf = state.findIndex((i) => i.id === payload);
      return [...state, state[indexOf]]


    case UNFOLLOW:
      const indexOfVacation = state.findIndex((i) => i.id === payload);
      return state[indexOfVacation]
      // return [...state, state[indexOfVacation]]

      case SET_FOLLOWERS: 
      const indexOF=state.findIndex(x=>x.id===payload.id)
      state[indexOF].followers=payload.followers
      const newArray=[...state]
      return newArray

    default:
      return state;

  }
};

export default reducerVacations;
