import React from 'react'
import Square from './Square'
import Piece from './Piece'

export default function BoardSquare({ piece, bgClass }) {

  return <div className='board-square'>
    <Square bgClass={bgClass}>
        <Piece piece={piece} />
    </Square>
  </div>
} 