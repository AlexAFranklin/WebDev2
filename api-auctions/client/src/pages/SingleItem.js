import React from 'react';
import axios from 'axios'; 
import '../App.css';
import {useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from '../pages/Header';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


function SingleItem() {
  let navigate = useNavigate();
  const initialValues = {
    lastBidderEmail: "",
    lastPrice: ""

}
    let { id } = useParams();

    const [item, setItem] = useState({});
    const [revealUpdate, setRevealUpdate] = useState(false);
    const [price, setPrice] = useState(0);
    const [schema, setSchema] = useState(null)



    useEffect(() => {
      axios.get("http://localhost:8080/items/" + id)
        .then((response) => {
          setItem(response.data);
    
          const newSchema = Yup.object({
            lastBidderEmail: Yup
              .string()
              .email("Enter a valid email.")
              .required("This field is required.")
              .max(320, "Too long."),
            lastPrice: Yup
              .number("The price must be a number")
              .positive("The price must be over $0.00")
              .required("This field is required.")
              .moreThan(response.data.lastPrice, `The price must be greater than $${response.data.lastPrice}`)
          });
    
          setSchema(newSchema);
        })
        .catch((error) => {
          console.log(error)
        });
    
      console.log(item); 
    }, [id, setItem, setSchema]);
  


    const onFormSubmit = (data) => {

      axios.patch(`http://localhost:8080/items/${item.id}`, data)
      .then((response) => {
          console.log(response.data);
          setRevealUpdate(false);
         navigate(0);
          })
          .catch((error) => {
            console.log(error)
          });
  };

      return (

        <>
            < Navbar />
        {item.id===null ?  (
          <div>Fetching item</div>
        ): item.id === undefined ? (
          <div>Item does not exist</div>
        ) : (
          <div className="card text-center m-5">
            <div className="card-header card-title">
            {item.itemName}
            </div>
            <div className="card-body">
              <p className="card-text">{item.itemDescription}</p>

              {!revealUpdate && (
              <a href="#" className="btn btn-warning" onClick={() =>{
                
                setRevealUpdate(true);
              }}>Put in a bid</a>

              )}



            </div>
            <div className="card-footer text-muted">
              Last Price: ${item.lastPrice.toFixed(2)}
            </div>

            {item.lastBidderEmail && (
                          <div className="card-footer text-muted">
                          Last Bidder's Email: {item.lastBidderEmail}
                        </div>
            )}


            {revealUpdate && (
              <>
              <Formik initialValues={initialValues}  onSubmit={onFormSubmit} validationSchema={schema}>
                <Form>
                <label htmlFor="emailInput">Bid Price: </label>
                    <ErrorMessage name='lastPrice' component="span" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="priceInput" 
                    name="lastPrice" 
                    placeholder={item.lastPrice}/>

                    <label htmlFor="inputEmail">Email Address: </label>
                    <ErrorMessage name='lastBidderEmail' component="span" className='text-danger'/>
                    <Field 
                    className="form-group form-control"
                    id="inputEmail" 
                    name="lastBidderEmail" 
                    placeholder="youremail@gmail.com"/>

                    <button className='btn btn-warning m-1' type='submit'>Add Bid</button>
                    <button className='btn btn-danger m-1' type='submit' onClick={() =>{
                      setRevealUpdate(false);
                    }}>Cancel</button>

                </Form>
              </Formik>

              </>

            )}




          </div>
        )}





        </>
    
       

        
      )

}

export default SingleItem;