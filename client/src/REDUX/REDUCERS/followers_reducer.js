import { FETCH_FOLLOWERS } from "../ACTIONS/types";

const reducerFollowers = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_FOLLOWERS:
        state=payload
        return state
    default:
      return state;
  }
};

export default reducerFollowers;
