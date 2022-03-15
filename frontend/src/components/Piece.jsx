import React from 'react'

//export default function Piece({ piece: { type, player } }) {

export default function Piece({ piece }) {
  const pieceImg = require (`../assets/${piece.type}_${piece.player}.png`)
  return ( 
    <div>
    <div className="piece-container">
      {piece.type != 'empty' &&
      <div className='piece-health'>{piece.healthPoints} | {piece.abilityPoints}</div>
      }
    </div>
    <div className="piece-container">
      <img src={ pieceImg } alt="" className="piece"/>
    </div>

    </div>
  )
}