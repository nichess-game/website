import React from 'react'
import {
  PieceType, KING_ABILITY_POINTS, MAGE_ABILITY_POINTS, PAWN_ABILITY_POINTS,
  WARRIOR_ABILITY_POINTS, ASSASSIN_ABILITY_POINTS
} from 'nichess'

function pieceTypeToStr(pieceType) {
  switch(pieceType) {
    case PieceType.P1_KING:
      return "king_0"
    case PieceType.P1_MAGE:
      return "mage_0"
    case PieceType.P1_WARRIOR:
      return "warrior_0"
    case PieceType.P1_ASSASSIN:
      return "assassin_0"
    case PieceType.P1_PAWN:
      return "pawn_0"
    case PieceType.P2_KING:
      return "king_1"
    case PieceType.P2_MAGE:
      return "mage_1"
    case PieceType.P2_WARRIOR:
      return "warrior_1"
    case PieceType.P2_ASSASSIN:
      return "assassin_1"
    case PieceType.P2_PAWN:
      return "pawn_1"
    case PieceType.NO_PIECE:
      return "empty_2"
    default:
      return "unknown piece type"
  }
}

function pieceTypeToAbilityPoints(pieceType) {
  switch(pieceType) {
    case PieceType.P1_KING:
      return KING_ABILITY_POINTS
    case PieceType.P1_MAGE:
      return MAGE_ABILITY_POINTS
    case PieceType.P1_WARRIOR:
      return WARRIOR_ABILITY_POINTS
    case PieceType.P1_ASSASSIN:
      return ASSASSIN_ABILITY_POINTS
    case PieceType.P1_PAWN:
      return PAWN_ABILITY_POINTS
    case PieceType.P2_KING:
      return KING_ABILITY_POINTS
    case PieceType.P2_MAGE:
      return MAGE_ABILITY_POINTS
    case PieceType.P2_WARRIOR:
      return WARRIOR_ABILITY_POINTS
    case PieceType.P2_ASSASSIN:
      return ASSASSIN_ABILITY_POINTS
    case PieceType.P2_PAWN:
      return PAWN_ABILITY_POINTS
    case PieceType.NO_PIECE:
      return 0
    default:
      return "unknown piece type"
  }
}


export default function Piece({ piece }) {
  const pieceImg = require (`../assets/${pieceTypeToStr(piece.type)}.png`)
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
      {piece.type != PieceType.NO_PIECE &&
      <div className={pieceHealthClass}>{piece.healthPoints}</div>
      }
      <div className="piece">
        <img src={ pieceImg } alt="" className="piece"/>
      </div>
      {piece.type != PieceType.NO_PIECE &&
      <div className={pieceAbilityPointsClass}>{piece.abilityPoints}</div>
      }

    </div>
  )
}
