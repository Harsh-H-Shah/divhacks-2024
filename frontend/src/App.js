import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Landing from './pages/Landing';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Landing/>} />
          <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
