import { applyMiddleware, combineReducers, createStore } from "redux";
import reducerUser from '../REDUX/REDUCERS/user_reducer'
import reducerVacations from "../REDUX/REDUCERS/vacations_reducer";
import reducerRegister from "../REDUX/REDUCERS/register_reducer";
import reducerFollowers from '../REDUX/REDUCERS/followers_reducer'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const allReducers = combineReducers({
  vacationsReducer: reducerVacations,
  userReducer: reducerUser,
  registerReducer: reducerRegister,
  followerReducer:reducerFollowers
});


const middleware = [thunk];


const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
