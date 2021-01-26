import { AppBar,  Toolbar,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { user_logout } from "../../REDUX/ACTIONS/user_action";
import "./navbar.css";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);

  const renderLinks = () => {
    if (userInfo && userInfo.role === 1) {
      return [
        <li key={Math.random() * 10000}>
          <NavLink to="/chart">Chart</NavLink>
        </li>,
        <li key={Math.random() * 10000}>
          <NavLink to="/vacations">Vacations</NavLink>
        </li>,
        <li key={Math.random() * 10000}>
          <NavLink onClick={() => user_logout(history, dispatch)} to="/login">
            Logout
          </NavLink>
        </li>,
      ];
    } else if (userInfo && userInfo.role === 0) {
      return [
        <li key={Math.random() * 10000}>
          <NavLink onClick={() => user_logout(history, dispatch)} to="/login">
            Logout
          </NavLink>
        </li>,
      ];
    }
  };

  return (
    <AppBar className="navbar" position="static">
      <Toolbar className="navbar_links_wrapper">
        <h1 className="navbar_name">Traveler LTD</h1>
        <span>
        Hello {userInfo?.first_name} {userInfo?.last_name}
      </span>
        <ul className="navbar_links">{renderLinks()}</ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
