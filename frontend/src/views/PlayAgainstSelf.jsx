import { React, useEffect, useState } from 'react'
import '../App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { gameSubject } from '../Game'
import BoardForSelfPlay from '../components/BoardForSelfPlay'

function PlayAgainstSelf() {
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

  return (
    <div>
      <div className="container">
        <div className="board-container">
          <BoardForSelfPlay board={board} game={game} />
        </div>
      </div>
    </div>
  )
}


export default PlayAgainstSelf;
