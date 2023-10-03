import React from 'react';
import axios from 'axios'; 
import '../App.css';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
import * as Yup from 'yup';

function Login() {
    const [userExists, setUserExists] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:8080/users/login")
        .then((response) => {
            console.log(response)
            console.log("changing")

        }).catch((error) => {
            console.log(error)
        })
    }, [])



    const initialRegister  = {
        password: "",
        passwordConfirm: "",
        username: "", 
        email: ""
    }

    const initialLogin = {
        password: "",
        email: ""
    }

    const loginSchema = Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required()
    
    })

 
    const registerSchema = (emailExists, usernameExists) => {
        return Yup.object({
            username: Yup
            .string()
            .required("This field is required")
            .max(20, "Username cannot exceed 20 characters")
            .min(4, "Username must be at least 4 characters long.")
            .matches(/^[a-z0-9]+$/, {message: "Username must be lowercase letters and numbers only"}),
            password: Yup
            .string()
            .required("This field is required")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[^ ]+$/, {message: "Password must contain one uppercase letter, one lowercase letter, and one number or special character."}        )
            .oneOf([Yup.ref('passwordConfirm'), null], 'Passwords must match')
            .min(6, "Password must be a minimum of 6 characters long")
            .max(100, "Password must be a maximum of 100 characters long"),
            passwordConfirm: Yup
            .string()
            .required("This field is required")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[^ ]+$/, {message: "Password must contain one uppercase letter, one lowercase letter, and one number or special character."})
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .min(6, "Password must be a minimum of 6 characters long")
            .max(100, "Password must be a maximum of 100 characters long"),
            email: Yup
            .string()
            .required("This field is required")
            .email("You must enter a valid email")

        })
    } 
    

    function toggleLogin() {
        setUserExists(!userExists);
    }
    
    const checkAuth = () => {
        console.log("hello?")
        axios.get("http://localhost:8080/users/authenticated", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log("this worked")
            console.log(response)
        }).catch((error) => {
            console.log("this didn't work")
            console.log(error)
        })
    }


    const onEmailBlur = (data) => {
        const email = {email: data.target.defaultValue};
        if (email !== undefined) {
            axios.post(`http://localhost:8080/users/email`, email)
            .then((response) => {
                setEmailExists(response.data.exists)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    };

    const onUserBlur = (data) => {
        const username = {username: data.target.defaultValue};
        if (username !== undefined) {
            axios.post(`http://localhost:8080/users/username`, username)
            .then((response) => {
               setUsernameExists(response.data.exists)
            })
            .catch((error) => {
                console.log(error)
            })
        }


      }
    

    const login = (data) => {
        axios.post(`http://localhost:8080/users/login`, data)
        .then((response) => {
            console.log(response)
            if (response.data.auth === true) {
                console.log("logged in")
                setLoggedIn(true);
               localStorage.setItem("token",  response.data.token);
               
            }
            
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const register = (data) => {
        axios.post(`http://localhost:8080/users/register`, data)
        .then((response) => {
            if (response.data.username == data.username && response.data.email == data.email && response.status == 201) {
                setUserExists(true);
                setUserCreated(true);
                setUsername(response.data.username);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    

    
    if (userExists) {
        return (
            <>
                {userCreated && (
                <div>User {username} Created</div>
                )}
                
                <div>
                <h1>Log In</h1>
                <button onClick={checkAuth}>Am I authenticated?</button>

                </div>

            

            

            <Formik initialValues={initialLogin} onSubmit={login} validationSchema={loginSchema} >
                <Form>
                    <label htmlFor="emailInput">Email: </label>
                    <ErrorMessage name='email' component="div" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="emailInput" 
                    name="email" 
                    />

                    <label htmlFor="passwordInput">Password: </label>
                    <ErrorMessage name='password' component="div" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="passwordInput" 
                    name="password"
                    type="password"
                   />
                    <button className='btn btn-warning m-5' type='submit'>Log In</button>

                </Form>
            </Formik>
            


            <p onClick={toggleLogin}>Register</p>
            </>
        )
    } else {
        return (
            <>
            <h1>Registration</h1>
            <Formik initialValues={initialRegister} onSubmit={register} validationSchema={registerSchema} >
                <Form>
                    <label htmlFor="usernameInput">Username: </label>
                    <ErrorMessage name='username' component="div" className='text-danger'/>
                    <div>{usernameExists && (<div className='text-danger'> That username already exists</div>)}</div>
                    <Field 
                    className="form-group form-control"
                    id="usernameInput" 
                    name="username" 
                    onBlurCapture={onUserBlur}
                    />

                    <label htmlFor="emailInput">Email: </label>
                    <ErrorMessage name='email' component="div" className='text-danger'/>
                    <div>{emailExists && (<div className='text-danger'> That email already exists</div>)}</div>
                    <></>
                    <Field 
                    className="form-group form-control"
                    id="emailInput" 
                    name="email" 
                    onBlurCapture={onEmailBlur}
                    />

                    <label htmlFor="passwordInput">Password: </label>
                    <ErrorMessage name='password' component="div" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="passwordInput" 
                    name="password" 
                    type="password"
                    
                   />

                    <label htmlFor="confirmPasswordInput">Confirm Password: </label>
                    <ErrorMessage name='passwordConfirm' component="div" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="confirmPasswordInput" 
                    name="passwordConfirm" 
                    type="password"
                   

                   />
                    <button className='btn btn-warning m-5' type='submit'>Create item</button>

                </Form>
            </Formik>
            <p onClick={toggleLogin}>Log in</p>
            </>
        )
    }




}
export default Login;