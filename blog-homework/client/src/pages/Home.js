import React from 'react';
import axios from 'axios'; 
// import '../App.css';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";




function Home() {
    const navigate = useNavigate();
    const [listArticles, setListArticles] = useState([]);
      useEffect(() => {
        axios.get("http://localhost:8080/blogs/all")
        .then((response) => {
            setListArticles(response.data)
        })
        .catch((error) => {
            console.log(error)
            setListArticles(null)
        })
      }, [setListArticles]);


      return (
        <>
            {listArticles.map((article, key) =>{
                return (

                    <>
                    <div className="card" key = {article.id} onClick={() => {navigate(`/${article.id}`)}}>
                        <div className="card-body">
                            <h5 className="card-title">Title: {article.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">By: {article.User.username}</h6>
                            <p className="card-text">Snippet: {article.content.substring(0,30)}...</p>
                        </div>
                    </div>
                    </>
                )

            })}


        </>

      )



}

export default Home;