
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, Switch} from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";
import ProtectedRoute from './ProtectedRoutes';
import { AuthContext } from './Contexts/AuthContext';

export const Context = React.createContext()

function App() {
const [isAuthRoute, setIsAuthRoute] = useState(false)

const [usernameGlob, setUsernameGlob] = useState("");
const [id, setId] = useState("");
const [isAuth, setIsAuth] = useState(false);


  return (
    <div className="App">
<Context.Provider value = {[isAuth, setIsAuth, usernameGlob, setUsernameGlob]}>
    <Router>

     
      <Routes>
        <Route path="/" exact Component={Home}/> 
        
          <Route path="/login" exact Component={Login}/> 
        
        <Route path="/:id"  exact Component={Article}/> 
        <Route path="/new"  exact Component={CreateArticle}/> 
        {/* <ProtectedRoute path="/new" Component={CreateArticle} isAuth={isAuth} /> */}
      
      </Routes>
      
      
      
    </Router>
    </Context.Provider>
    
    </div>
  );
}

export default App;
