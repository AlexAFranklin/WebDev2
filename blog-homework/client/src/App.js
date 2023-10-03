
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";

function App() {
  return (
    <div className="App">
    <Router>

     
      <Routes>
        <Route path="/" exact Component={Home}/> 
        <Route path="/login" exact Component={Login}/> 
        <Route path="/:id"  exact Component={Article}/> 
        <Route path="/new"  exact Component={CreateArticle}/> 

      </Routes>
    </Router>
    </div>
  );
}

export default App;
