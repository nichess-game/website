import logo from './logo.svg';
import { React, useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import About from './views/About'
import Rules from './views/Rules'
import Play from './views/Play'
import PlayAgainstTheWorld from './views/PlayAgainstTheWorld'
import PlayAgainstSelf from './views/PlayAgainstSelf'
import PlayAgainstAI from './views/PlayAgainstAI'

function App() {
  document.title = "Nichess"

  return (
    <div className="main">
      <BrowserRouter>
        <ul className="navbar-ul">
          <li><Link to="/">About</Link></li>
          <li><Link to="/rules">Rules</Link></li>
          <li><Link to="/play">Play</Link></li>
        </ul>
        <Routes>
          <Route path="/" element={<About />} /> 
          <Route path="/rules" element={<Rules />} /> 
          <Route path="/play" element={<Play />} /> 
          <Route path="/play-against-self" element={<PlayAgainstSelf />} /> 
          <Route path="/play-against-the-world" element={<PlayAgainstTheWorld />} /> 
          <Route path="/play-against-ai" element={<PlayAgainstAI />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App;
