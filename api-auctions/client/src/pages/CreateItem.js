import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Navbar from '../pages/Header';

function CreatePost(){
    const initialValues = {
        sellerEmail: "",
        itemName: "",
        itemDescription: "",
        lastPrice: ""

    }
let navigate = useNavigate();
    const schema = Yup.object({
        sellerEmail: Yup
        .string()
        .email("Enter valid email")
        .required("This field is required.")
        .max(320, "Too long.")
        ,
        itemName: Yup
        .string()
        .min(2, "Too short")
        .max(100, "Too long")
        .required("This field is required.")
        , 
        itemDescription: Yup
        .string()
        .min(2, "Too short")
        .max(10000, "Too long")
        .required("This field is required.")
        , 
        lastPrice: Yup
        .number("The price must be a number")
        .positive("The price must be over $0.00")
        .required("This field is required.")
    })

    const onFormSubmit = (data) => {

        axios.post("http://localhost:8080/items", data).then((response) => {
            console.log(response.data);
           navigate(`/${response.data.id}`);
            });
    };

    return (
        <>
        < Navbar />
        <div className='form form-container p-3  mx-auto mt-3'>
            <h1 className="my-3">Create new auction item</h1>
            <Formik initialValues={initialValues} onSubmit={onFormSubmit} validationSchema={schema}>
                <Form>
                    <label htmlFor="emailInput">Email: </label>
                    <ErrorMessage name='sellerEmail' component="span" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="emailInput" 
                    name="sellerEmail" 
                    placeholder="myemail@gmail.com"/>

                    <label htmlFor="inputItemName">Item Name: </label>
                    <ErrorMessage name='itemName' component="span" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="inputItemName" 
                    name="itemName" 
                    placeholder="Toy Car"/>

                    <label htmlFor="inputItemDesc">Item Description: </label>
                    <ErrorMessage name='itemDescription' component="span" className='text-danger'/>
                    <Field 
                    type="textarea"
                    className="form-group form-control" 
                    id="inputItemDesc" 
                    name="itemDescription" 
                    placeholder="From 1950s, vintage, shiny and red."/>

                    <label htmlFor="inputLastPrice">Last Price: </label>
                    <ErrorMessage name='lastPrice' component="span" className='text-danger'/>
                    <Field 
                    type="number"
                    className="form-group form-control"
                    id="inputLastPrice" 
                    name="lastPrice" 
                    placeholder="10.00"/>

                    <button className='btn btn-warning m-5' type='submit'>Create item</button>


                </Form>
            </Formik>
        </div>
        </>
    )
}





export default CreatePost;