import React from 'react';
import axios from 'axios'; 
import '../App.css';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

function CreateArticle() {

    const initialValues = {
        title: "",
        content: "",
        UserId: 2
    }

    const schema = Yup.object({
        title: Yup
        .string()
        .required("This field is required.")
        .max(100, "Title must be a maximum of 100 characters long.")
        .min(10, "Title must be a minimum of 10 characters long.")
        ,
        content: Yup
        .string()
        .min(50, "Content must be a minimum of 50 characters long.")
        .max(4000, "Content must be a maximum of 4000 characters long.")
        .required("This field is required.")
       
    })

    const onFormSubmit = (data) => {
        console.log(data);
    };

    return (
     <>
             <div className='form form-container p-3  mx-auto mt-3'>
            <h1 className="my-3">Create a new blog post</h1>
            <Formik initialValues={initialValues} onSubmit={onFormSubmit} validationSchema={schema}>
                <Form>
                    <label htmlFor="titleInput">Title: </label>
                    <ErrorMessage name='title' component="div" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="titleInput" 
                    name="title" 
                    />

                    <label htmlFor="contentInput">Content: </label>
                    <ErrorMessage name='content' component="div" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="contentInput" 
                    name="content" 
                    component="textarea"
                    rows="6"
                   />


                    <button className='btn btn-warning m-5' type='submit'>Create item</button>


                </Form>
            </Formik>
        </div>
     
     </>
    )
}
export default CreateArticle;