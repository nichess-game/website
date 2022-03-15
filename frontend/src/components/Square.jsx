import React from 'react'

export default function Square({ children, bgClass}) {
/*
  let bgClass = black ? 'square-black' : 'square-white'
  bgClass = selected ? 'square-selected' : bgClass
*/
  return (
    <div className={`${bgClass} board-square`}>
      { children }
    </div>
  )
}