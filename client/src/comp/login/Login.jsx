import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { user_action } from "../../REDUX/ACTIONS/user_action";
import { TextField, Button } from "@material-ui/core";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="login_form" noValidate autoComplete="off">
      <div className="inputs_form">
        <TextField
          id="outlined-basic-top"
          label="Username"
          variant="outlined"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-button">
        <Button
          color="primary"
          type="submit"
          className="login_button"
          onClick={() => dispatch(user_action(username, password, history))}
        >
          Login
        </Button>
        <h5>Not signed in yet?</h5>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
