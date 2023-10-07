import axios from 'axios'; 
// import '../App.css';
import { useEffect, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
import * as Yup from 'yup';
import Alert from './alert';
import { IdContext, AuthContext } from '../App'; 


function Register() {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [userId, setUserId] = useContext(IdContext)
    const [errorMsg, setErrorMsg] = useState("")
    const [emailExists, setEmailExists] = useState(false);

    const initialRegister  = {
        password: "",
        passwordConfirm: "",
        email: ""
    }

    const registerSchema = (emailExists, usernameExists) => {
        return Yup.object({

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

    const onEmailBlur = (data) => {
        const email = {email: data.target.defaultValue};
        if (email !== undefined) {
            axios.post(`http://localhost:8080/api/users/findEmail`, email)
            .then((response) => {
                setEmailExists(response.data.exists)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    };

    const register = (data) => {
        axios.post(`http://localhost:8080/api/users/register`, data)
        .then((response) => {
            console.log(response);
             setErrorMsg("Account successfully created with email " + response.data.email)
            
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        })
        .catch((error) => {
            console.log(error)
        })
    }



    return (
        <div>
            
            {!isAuth && (
                        
                            <>
                            <h1>Registration</h1>
                            <Formik initialValues={initialRegister} onSubmit={register} validationSchema={registerSchema} >
                                <Form>
                                    <label htmlFor="emailInput">Email: </label>
                                    <ErrorMessage name='email' component="div" className='text-danger'/>
                                    <div>{emailExists && (<div className='text-danger'> That email already exists</div>)}</div>
                                    <></>
                                    <Field 
                                    className="form-group form-control mx-5"
                                    id="emailInput" 
                                    name="email" 
                                    onBlurCapture={onEmailBlur}
                                    />
                
                                    <label htmlFor="passwordInput">Password: </label>
                                    <ErrorMessage name='password' component="div" className='text-danger'/>
                                    <Field 
                                    className="form-group form-control mx-5"
                                    id="passwordInput" 
                                    name="password" 
                                    type="password"
                                    
                                   />
                
                                    <label htmlFor="confirmPasswordInput">Confirm Password: </label>
                                    <ErrorMessage name='passwordConfirm' component="div" className='text-danger'/>
                                    <Field 
                                    className="form-group form-control mx-5"
                                    id="confirmPasswordInput" 
                                    name="passwordConfirm" 
                                    type="password"
                                   
                
                                   />
                                    <button className='btn btn-warning m-5' type='submit'>Create item</button>
                                    <button className='btn btn-info m-5' onClick={() => {navigate("/login")}} >I have an account</button>
                
                                </Form>
                            </Formik>

                            </>
                        




            )}



            {errorMsg && (
                <Alert message={errorMsg} showModal={true} />
            )}
        </div>
    )
}
export default Register;