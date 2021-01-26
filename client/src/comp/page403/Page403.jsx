import React from "react";
import { NavLink } from "react-router-dom";
import './page.css'

const Page403 = () => {
  return (
    <div className="header">
      <h1>Oops... its looks like your Unahutorized to get in this page...</h1>
        <img
          src="https://assets.materialup.com/uploads/0c506c96-7e91-457c-8842-ba8a9857a81f/preview.jpg"
          alt="unauth"
        />
        <NavLink to="/register">Register Now!</NavLink>
    </div>
  );
};

export default Page403;
