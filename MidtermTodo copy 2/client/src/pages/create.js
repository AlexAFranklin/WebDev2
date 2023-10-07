import axios from 'axios'; 
// import '../App.css';
import { useEffect, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
import * as Yup from 'yup';
import Alert from './alert';
import { IdContext, AuthContext } from '../App'; 

function Create() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [userId, setUserId] = useContext(IdContext)
    const [errorMsg, setErrorMsg] = useState("")

    const initialValues = {
        task: "",
        dueDate: "",
        UserId: userId
    }

    const schema = Yup.object({
        task: Yup
        .string()
        .required("This field is required.")
        .max(100, "Too long.")
        ,
        dueDate: Yup
        .date("Please enter valid date")
        .required()
    })

    const onFormSubmit = (data) => {

        axios.post("http://localhost:8080/api/todos/new", data, {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            navigate("/");
            }).catch((error) => {
                console.log(error)
            })
        .catch((error) => {
            console.log(error)
        })
    };

    return (
        <>
      
        <div className='form form-container p-3  mx-auto mt-3'>
            <h1 className="my-3">Create New Todo Item</h1>
            <Formik initialValues={initialValues} onSubmit={onFormSubmit} validationSchema={schema}>
                <Form>
                    <label htmlFor="taskInput">Task </label>
                    <ErrorMessage name='task' component="span" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="taskInput" 
                    name="task" 
                    placeholder="do laundry"/>

                    <label htmlFor="inputDate">Item Name: </label>
                    <ErrorMessage name='dueDate' component="span" className='text-danger'/>
                    <Field 
                    type="date"
                    className="form-group form-control"
                    id="inputItemName" 
                    name="dueDate" 
                    />

                    <button className='btn btn-warning m-5' type='submit'>Create item</button>


                </Form>
            </Formik>
        </div>
        </>
    )




}

export default Create;