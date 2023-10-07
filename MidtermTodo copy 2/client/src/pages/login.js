import axios from 'axios'; 
// import '../App.css';
import { useEffect, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
import * as Yup from 'yup';
import Alert from './alert';
import { IdContext, AuthContext } from '../App'; 

function Login() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [userId, setUserId] = useContext(IdContext)
    const [errorMsg, setErrorMsg] = useState("")

    const initialLogin = {
        password: "",
        email: ""
    }
    const loginSchema = Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required()
    })

    const login = (data) => {
        axios.post(`http://localhost:8080/api/users/login`, data)
        .then((response) => {
            console.log(response)
            if (response.data.auth === true) {
                setIsAuth(true);
                const id = response.data.id;
                setUserId(id)
                setErrorMsg("")
                localStorage.setItem("token",  response.data.token);
                navigate(`/`);
            }
            
        })
        .catch((error) => {
            setErrorMsg(error.response.data.message)
            console.log(error.response.data.message)
            setTimeout(() => {
                setErrorMsg("");
            }, 5000);
        })
    }


    return (
        <>
        

        <h1>Log In</h1>
        <Formik initialValues={initialLogin} onSubmit={login} validationSchema={loginSchema} >
            <Form>
                <label htmlFor="emailInput">Email: </label>
                <ErrorMessage name='email' component="div" className='text-danger'/>
                <Field 
                className="form-group form-control mx-5"
                id="emailInput" 
                name="email" 
                />

                <label htmlFor="passwordInput">Password: </label>
                <ErrorMessage name='password' component="div" className='text-danger'/>
                <Field 
                className="form-group form-control mx-5"
                id="passwordInput" 
                name="password"
                type="password"
               />
                <button className='btn btn-warning m-5' type='submit'>Log In</button>
                <button className='btn btn-info m-5' onClick={() => {navigate("/register")}} >I don't have an account</button>


            </Form>
        </Formik>
        


       
        {errorMsg && (
            <Alert message={errorMsg} showModal={true} />
            
        )}



        </>
    )
}
export default Login;










// import axios from 'axios'; 
// import '../App.css';
// import { useEffect, useState, useContext } from 'react';
// import {useNavigate} from "react-router-dom";
// import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
// import * as Yup from 'yup';
// import Alert from './Alert'
// import { Context } from '../App'; 

// function Login() {}
// export default Login;