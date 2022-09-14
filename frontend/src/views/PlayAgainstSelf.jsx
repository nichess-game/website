import { React, useEffect, useState } from 'react'
import '../App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { gameSubject } from '../GameAgainstSelf'
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

  var boardContainerClass = 'board-container'
  if (/Mobi|Android/i.test(navigator.userAgent)) { // TODO: Write better solution for mobile.
    boardContainerClass = 'board-container-mobile'
  }

  return (
    <div>
      <div className="container">
        <div className={boardContainerClass}>
          <BoardForSelfPlay board={board} game={game} />
        </div>
      </div>
    </div>
  )
}


export default PlayAgainstSelf;
