import React from 'react'

export default function Piece({ piece }) {
  const pieceImg = require (`../assets/${piece.type}_${piece.player}.png`)
  var pieceHealthClass = 'piece-health'
  if (/Mobi|Android/i.test(navigator.userAgent)) { // TODO: Write better solution for mobile.
    pieceHealthClass = 'piece-health-mobile'
  }
  var pieceAbilityPointsClass = 'piece-ability-points'
  if (/Mobi|Android/i.test(navigator.userAgent)) { // TODO: Write better solution for mobile.
    pieceAbilityPointsClass = 'piece-ability-points-mobile'
  }


  return ( 
    <div className="piece-container">
      {piece.type != 'empty' &&
      <div className={pieceHealthClass}>{piece.healthPoints}</div>
      }
      <div className="piece">
        <img src={ pieceImg } alt="" className="piece"/>
      </div>
      {piece.type != 'empty' &&
      <div className={pieceAbilityPointsClass}>{piece.abilityPoints}</div>
      }

    </div>
  )
}
