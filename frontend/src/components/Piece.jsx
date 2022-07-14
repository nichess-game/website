import React from 'react'

export default function Piece({ piece }) {
  const pieceImg = require (`../assets/${piece.type}_${piece.player}.png`)
  var pieceHealthClass = 'piece-health'
  if (/Mobi|Android/i.test(navigator.userAgent)) { // TODO: Write better solution for mobile.
    pieceHealthClass = 'piece-health-mobile'
  }

  return ( 
    <div className="piece-container">
      {piece.type != 'empty' &&
      <div className={pieceHealthClass}>{piece.healthPoints} | {piece.abilityPoints}</div>
      }
      <div className="piece">
        <img src={ pieceImg } alt="" className="piece"/>
      </div>
    </div>
  )
}
