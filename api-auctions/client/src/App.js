import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import SingleItem from "./pages/SingleItem";
function App() {




  return (
    <div className="App">
    <Router>
      {/* <Link to="/createitem">Create A Post</Link>
      <Link to="/">Homepage</Link> */}
      <Routes>
        <Route path="/" exact Component={Home}/> 
        <Route path="/createitem" exact Component={CreateItem}/> 
        <Route path="/:id"  exact Component={SingleItem}/> 
      </Routes>
    </Router>
  
    </div>
  );
}

export default App;
