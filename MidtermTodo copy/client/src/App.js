import {BrowserRouter as Router, Route, Routes, Link, Switch} from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react';
import Login from './pages/login';
import './App.css';
import Register from './pages/register';
import Home from './pages/home';
import Create from './pages/create.js';

export const AuthContext = React.createContext()
export const IdContext = React.createContext()

function App() {

  const [userId, setUserId] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="App">


      


      <IdContext.Provider value={[userId, setUserId]}>
      <AuthContext.Provider value={[isAuth, setIsAuth]}>
      {isAuth ? (
        <div>LOGGED IN</div>
      ) : (
        <div>NOT LOGGED IN</div>
      )}
      
      <Router>
        <Routes>
          {/* NOT HOW TO DO THIS, middle of figuring this out, this will have to do? */}
        {isAuth ? (
          <>
          <Route path="/" exact Component={Home}/>
          <Route path="/new" exact Component={Create}/>
          </>
      ) : (
        <>
          <Route path="/" exact Component={Login}/>
          <Route path="/new" exact Component={Register}/>
          </>
      )}
          <Route path="/login" exact Component={Login}/>
          <Route path="/register" exact Component={Register}/>
          
        </Routes>
      </Router>
      </AuthContext.Provider>
      </IdContext.Provider>
 
     

    </div>
  );
}

export default App;
