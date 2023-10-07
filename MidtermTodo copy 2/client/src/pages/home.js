import axios from 'axios'; 
import '../App.css';
import { useEffect, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
// import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
// import * as Yup from 'yup';
import Alert from './alert';
import { IdContext, AuthContext } from '../App'; 
function Home() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [userId, setUserId] = useContext(IdContext)
    const [errorMsg, setErrorMsg] = useState("")
    const [listOfTodos, setListOfTodos] = useState([])
    const [newDeleted, setNewDeleted] = useState(false);


    useEffect(() => {
        console.log("HELLO")
        console.log(userId)
        axios.get(`http://localhost:8080/api/todos/all/${userId}`, {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
        console.log("I am rendering.");
        setListOfTodos(response.data);
        })
        .catch((error) => {
            console.log(error)
        });
      }, [setListOfTodos]);

      const onUpdate = (data) => {
        data.isDone = 1;
        axios.patch (`http://localhost:8080/api/todos/update/${data.id}`, data, {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            navigate("/");
            }).catch((error) => {
                console.log(error)
                navigate(0);
            })
        .catch((error) => {
                console.log(error)
            })
    };

    const onDelete = (data) => {
      data.UserId = userId; 
        axios.delete (`http://localhost:8080/api/todos/${data.id}`, data, {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            navigate("/");
            }).catch((error) => {
                console.log(error)
                setNewDeleted(!newDeleted);
                navigate(0);
            })
        .catch((error) => {
                console.log(error)
            })
    };


    return (
        <div>
            {isAuth &&  listOfTodos && (
                <div>
                { listOfTodos.map((todo, key) =>{


                    return (
                     
                      <div className='card m-5 ' >
            
                          <div className="card-body" key={todo.id} >
                          <h2 className="card-header bg-info" >{todo.task}</h2>
                          <p className="card-text mt-2" >Due Date: {todo.dueDate.substring(0, 10)}</p>
                          <p className="card-text"  >{todo.isDone == 0 ? 'Pending' : 'Complete' }</p>
                          <p className='btn btn-secondary mx-1' onClick={() => onUpdate(todo)}> Task Completed </p>
                          <p className='btn btn-danger mx-1' onClick={() => onDelete(todo)}> Delete </p>
                         </div>
                      </div>
                    )
                  })}

                  <div>
                  <p className='btn btn-warning mx-1' onClick={() => {navigate("/new")}} > Create New Todo </p>
                  </div>
                  </div>
                  

                 
            )}
        </div>
    );
}
export default Home;