import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useContext } from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-slate-800">
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
