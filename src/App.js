import React from "react";
import "./App.css";
// import NavPage from "./components/NavPage";
import { BrowserRouter, Router } from "react-router-dom";
// import Home from "./pages/Home";
// import NavBar from "./components/NavBar";
// import MainPage from "./components/MainPage";
import FoodLog from "./Foodlog.js";

function App() {
  return (
    
      <BrowserRouter>
      
      <FoodLog />
      </BrowserRouter>
       
    
   
  
  );
}

export default App;
