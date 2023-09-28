import React from 'react';
import axios from 'axios'; 
import '../App.css';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Navbar from '../pages/Header';

function Home() {

    const [listOfItems, setListOfItems] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
      axios.get("http://localhost:8080/items").then((response) => {
      console.log("I am rendering.");
      setListOfItems(response.data);
      });
    }, [setListOfItems]);
  

    return (
        <div className='App'>
          < Navbar />
   
      {listOfItems.map((value, key) =>{


        return (
         
          <div className='card m-5 hover' onClick={() => {navigate(`/${value.id}`)}}>

              <div className="card-body" key={value.id} >
              <h2 className="card-header" >{value.itemName}</h2>
              <p className="card-text mt-2" >Seller's Email: {value.sellerEmail}</p>
              <p className="card-text"  >{value.itemDescription}</p>
              <h5 className='card-text' > ${value.lastPrice.toFixed(2)}</h5>
             </div>
          </div>
        )
      })}
        </div>

    )
}

export default Home;