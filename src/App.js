import { Switch, Route, Link } from "react-router-dom";
import {useState,useEffect} from "react";
import {Login} from "./Login.js"
import { Signup } from "./Signup.js";
import {Forgot} from "./Forgot.js";
import {Reset} from "./Reset.js";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import './App.css';
import { useParams,} from "react-router";

function App() {
  const display = localStorage.getItem("token");
  const temp_display=localStorage.getItem("temp_token");
  
 
  return (
   
    <div >
       <AppBar position="static"> 
      <ul className="appbar">
        <li>
          <Link to="/"><Button variant="text" style={{color:"white"}}>Home</Button></Link>
        </li>
        {display ? (
          <div className="appbar">
            <li>
              <Link to="/logout"><Button variant="text" style={{color:"white"}}>Logout</Button></Link>
            </li>
          </div>
        ) : 
        (
          <div className="appbar">
          <li>
            <Link to="/Login"><Button variant="text" style={{color:"white"}}>Login</Button></Link>
          </li>
           <li>
           <Link to="/Signup"><Button variant="text" style={{color:"white"}}>Signup</Button></Link>
         </li>
         </div>
        )}
      </ul>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/Signup">
          <Signup />
        </Route>
        <Route exact path="/Reset">
          <Reset />
        </Route>
        <Route exact path="/Forgot">
          <Forgot />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>  
      </Switch>
    </div>
    
  );
}

export default App;

function Home(){
  return(
    <div className="Welcome"><p >Welcome to Password reset app</p></div>
  );
}

function Logout() {
  localStorage.removeItem("token");
  
  return (
    <div>
      <h1>Login to continue</h1>
    </div>
  );
}

