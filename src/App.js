import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useContext } from "react";
import Home from "./pages/Home";
import Calc from "./pages/Calculator";

function App() {
  return (
    <div className="bg-slate-900">
      <div className="absolute flex p-2 font-bold w-full ">
        <div className=" w-1/3 flex items-start justify-start h-full my-auto">
          <button onClick={()=>{
            window.location.href="/"
          }} className="bg-emerald-600 p-2 rounded-lg w-full md:w-1/3">Back</button>
        </div>
        <div className="w-full md:w-1/3 font-bold lg:text-[3.5rem] text-[1.5rem] text-center text-white">
          My Personal
        </div>
        <div className="w-1/3 flex items-end justify-end my-auto h-full">
          <button className="bg-emerald-600 p-2 rounded-lg w-full md:w-1/3 ">Profile</button>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/Calculator" Component={Calc} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
