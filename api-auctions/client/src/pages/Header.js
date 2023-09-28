import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Header(){

    let navigate = useNavigate();
return (


    <nav className="navbar navbar-expand-lg navbar-light bg-light py-4 px-3">
  <a className="navbar-brand fs-3" href="/">myAuction</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link fs-5" href="/">Home </a>
      </li>
      <li className="nav-item">
        <a className="nav-link fs-5" href="/createItem" >Create new item</a>
      </li>

    </ul>
  </div>
</nav>
)



}

export default Header;