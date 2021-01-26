import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import VacationList from "./comp/Vacation/VacationList";
import Login from "./comp/login/Login";
import Register from "./comp/register/Register";
import Navbar from "./comp/navbar/Navbar";
import VacationChart from "./comp/Vacation/VacationChart";
import ModalVacation from "./comp/Vacation/ModalVacation/ModalVacation";
import { USER_SUCCESS } from "./REDUX/ACTIONS/types";
import { useDispatch } from "react-redux";
import Page403 from "./comp/page403/Page403";

const App = () => {
  const dispatch = useDispatch();

  const handleRefresh = async () => {
    const URL = `http://localhost:5000/unrefresh/${localStorage.getItem(
      "Token"
    )}`;
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    dispatch({
      type: USER_SUCCESS,
      payload: data,
    });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/chart" exact component={VacationChart} />
          <Route path="/vacations" exact component={VacationList} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/edit" exact component={ModalVacation} />
          <Route path="/page" exact component={Page403} />
          <Route path="**" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
