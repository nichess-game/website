import logo from './logo.svg';
import { React, useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { gameSubject } from './Game'
import About from './views/About'
import Rules from './views/Rules'
import PlayAgainstTheWorld from './views/PlayAgainstTheWorld'
import PlayAgainstSelf from './views/PlayAgainstSelf'

function App() {
  const [board, setBoard] = useState([])
  const [game, setGame] = useState([])

  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => setBoard(game.board))
    return () => subscribe.unsubscribe()
  }, [])
  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => setGame(game))
    return () => subscribe.unsubscribe()
  }, [])

  document.title = "Nichess"

  return (
    <div className="main">
      <BrowserRouter>
        <ul className="navbar-ul">
          <li><Link to="/">About</Link></li>
          <li><Link to="/rules">Rules</Link></li>
          <li><Link to="play-against-self">Play against self</Link></li>
          <li><Link to="play-against-the-world">Play against the world</Link></li>
        </ul>
        <Routes>
          <Route path="/" element={<About />} /> 
          <Route path="/rules" element={<Rules />} /> 
          <Route path="/play-against-self" element={<PlayAgainstSelf />} /> 
          <Route path="/play-against-the-world" element={<PlayAgainstTheWorld />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App;
