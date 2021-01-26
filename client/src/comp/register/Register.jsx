import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register_action } from "../../REDUX/ACTIONS/register_actions";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <div className="register_form">
      <h3>Please enter the following fields to Register:</h3>
        <TextField
          id="outlined-basic-top"
          label="First Name"
          variant="outlined"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="outlined-basic-top"
          label="Last Name"
          variant="outlined"
          type="text"
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          id="outlined-basic-top"
          label="Username"
          variant="outlined"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic-top"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color="primary"
          type="submit"
          className="register_button"
          onClick={(e) =>
            dispatch(
              register_action(firstName, lastname, username, password, history)
            )
          }
        >
          Register
        </Button>
        <h5>Already a user?</h5>
        <Link to="/Login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
