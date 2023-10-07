import React from 'react';
import axios from 'axios'; 
import '../App.css';
import { useEffect, useState, useContext } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { Context } from '../App'; 


function Article() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [username, setUsername] = useState(null);
  

    const [isAuth, setIsAuth] = useContext(Context)
    const [usernameGlob, setUsernameGlob] = useContext(Context)



    useEffect(() => {
        
        axios.get(`http://localhost:8080/blogs/${id}` )
        .then((response) => {
            setArticle(response.data)
            setUsername(response.data.User.username)
            console.log("isAuth? " + isAuth)
            console.log("username: " + usernameGlob)
           
        })
        .catch((error) => {
            if (error.response.status == 400) {
                setErrorMsg("This article does not exist")
            } else {
                setErrorMsg("Something went wrong")
            }
            setArticle(null)
        })
      }, [setArticle]);

    return (
        <>

        {errorMsg && (
            <div>{errorMsg}</div>
        )}
        {article && username && (
                    <div className="card" key = {article.id}>
                        <div className="card-body">
                            <h5 className="card-title">Title: {article.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">By: {username}</h6>
                            <p className="card-text">Article: {article.content}</p>
                        </div>
                    </div>


        )}
        
        <p className='mt-4' onClick={() => {navigate(`/`)}}>Back to home</p>


        </>
    )
}
export default Article;