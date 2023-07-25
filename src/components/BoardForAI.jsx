import React, { useState, useEffect } from 'react'
import BoardSquare from './BoardSquare'
import { handleMove, handleAbility, updateView, pieceBelongsToCurrentPlayer, isSquareEmpty } from '../GameAgainstAI'
import { MOVE_SKIP, ABILITY_SKIP } from 'nichess'
import createModule from "../ai.mjs";

export default function BoardForSelfPlay({board, game}) {
  const [phase, setPhase] = useState(0)
  const [moveSrcIdx, setMoveSrcIdx] = useState(MOVE_SKIP)
  const [moveDstIdx, setMoveDstIdx] = useState(MOVE_SKIP)
  const [abilitySrcIdx, setAbilitySrcIdx] = useState(ABILITY_SKIP)
  const [abilityDstIdx, setAbilityDstIdx] = useState(ABILITY_SKIP)
  const [legalMoves, setLegalMoves] = useState([])
  const [legalAbilities, setLegalAbilities] = useState([])
  const [lastMove, setLastMove] = useState({srcIdx: MOVE_SKIP, dstIdx: MOVE_SKIP})
  const [lastAbility, setLastAbility] = useState({srcIdx: ABILITY_SKIP, dstIdx: ABILITY_SKIP})
  const [gameStatus, setGameStatus] = useState("Player 1's move")

  useEffect(() => {
    // I don't understand how this works, why is it not always defined?
    if (typeof game.game === 'undefined')
      return
    if(game.game.moveNumber == 0) {
      setLastMove({ srcIdx: MOVE_SKIP, dstIdx: MOVE_SKIP })
      setLastAbility({ srcIdx: ABILITY_SKIP, dstIdx: ABILITY_SKIP })
    } 
  }, [game])

  function getXYPosition(i) {
    const x = i % 8
    const y = Math.abs(Math.floor(i / 8) - 7)
    return {x, y}
  }

  function isBlack(i) {
    const {x, y} = getXYPosition(i)
    return (x + y) % 2 == 1
  }

  function isLastMove(i) {
    return (lastMove.srcIdx == i) || (lastMove.dstIdx == i)
  }

  function isLastAbility(i) {
    return (lastAbility.srcIdx == i) || (lastAbility.dstIdx == i)
  }

  function isSelectedAsMovementSource(i) {
    if(i === moveSrcIdx){
      return true
    }
    return false
  }

  function isSelectedAsAbilitySource(i) {
    if(i === abilitySrcIdx){
      return true
    }
    return false
  }

  function isLegalMove(i) {
    if(legalMoves.includes(i)) {
      return true
    }
    return false
  }

  function isLegalAbility(i) {
    if(legalAbilities.includes(i)) {
      return true
    }
    return false
  }


  function getBgClass(i) {
    var retval = '' 
    if(isBlack(i)) {
      retval = 'square-black'
      if(isLastMove(i)) {
        retval = 'square-black-last-move'
      }
      if(isLastAbility(i)) {
        retval = 'square-black-last-ability'
      }
    } else {
      retval = 'square-white'
      if(isLastMove(i)) {
        retval = 'square-white-last-move'
      }
      if(isLastAbility(i)) {
        retval = 'square-white-last-ability'
      }
    }
    if(phase == 1) {
      if(isSelectedAsMovementSource(i)){
        retval = 'square-movement-source'
      }
      if(isLegalMove(i)) {
        if(isBlack(i)) {
          retval = 'square-black-legal-move'
        } else {
          retval = 'square-white-legal-move'
        }
      }
    } else if(phase == 3) {
      if(isSelectedAsAbilitySource(i)){
        retval = 'square-ability-source'
      }
      if(isLegalAbility(i)) {
        if(isBlack(i)) {
          retval = 'square-black-legal-ability'
        } else {
          retval = 'square-white-legal-ability'
        }
      }

    }
    return retval
  }

  function handleMovementSourceSelection(squareIdx) {
    if(!pieceBelongsToCurrentPlayer(squareIdx)) {
      return
    }
    setMoveSrcIdx(squareIdx)
    let legalMoves = game.game.legalMovesByPiece(squareIdx)
    let moveIndices = legalMoves.map(pm => { return pm.moveDstIdx })
    if(legalMoves.length != 0) {
      setLegalMoves(moveIndices)
      setPhase(1)
    }
  }

  function handleMovementDestinationSelection(squareIdx) {
    if(squareIdx == moveSrcIdx){
      setPhase(0)
      return
    }
    if(!legalMoves.includes(squareIdx)) {
      return
    }
    setMoveDstIdx(squareIdx)
    let success = handleMove(moveSrcIdx, squareIdx)
    setLastMove({srcIdx: moveSrcIdx, dstIdx: squareIdx})
    setPhase(2)
    setGameStatus("Player " + (game.game.currentPlayer+1) + "'s ability")
  }

  function handleAbilitySourceSelection(squareIdx) {
    if(!pieceBelongsToCurrentPlayer(squareIdx)) {
      return
    }
    setAbilitySrcIdx(squareIdx)
    let legalAbilities = game.game.allLegalAbilitiesByPiece(squareIdx)
    let abilityIndices = legalAbilities.map(pa => { return pa.abilityDstIdx })
    if(legalAbilities.length != 0) {
      setLegalAbilities(abilityIndices)
      setPhase(3)
    }
  }

  function handleAbilityDestinationSelection(squareIdx) {
    if(squareIdx == abilitySrcIdx){
      setPhase(2)
      return false
    }
    if(!legalAbilities.includes(squareIdx)) {
      return
    }

    setAbilityDstIdx(squareIdx)
    handleAbility(moveSrcIdx, moveDstIdx, abilitySrcIdx, squareIdx)
    setLastAbility({srcIdx: abilitySrcIdx, dstIdx: squareIdx})
    return true
  }


  function handleClick(i) {
    if(phase == 0) {
      handleMovementSourceSelection(i)
    } else if(phase == 1) {
      handleMovementDestinationSelection(i)
    } else if(phase == 2) {
      handleAbilitySourceSelection(i)
    } else if(phase == 3) {
      var success = handleAbilityDestinationSelection(i)
      if(success) {
        let gameOver = game.game.gameOver()
        if(gameOver) {
          alert('You LOSE!')
          game.game.reset()
          setMoveSrcIdx(-1)
          setMoveDstIdx(-1)
          setAbilitySrcIdx(-1)
          setAbilityDstIdx(-1)
          setPhase(0)
          setGameStatus("Player " + (game.game.currentPlayer+1) + "'s move")
          updateView()
        } else {
          setPhase(4)
          setGameStatus("Waiting for AI's action")
          AIAction()
        }
      }
    } else if(phase == 4) {
      return // waiting for AI action
    }
  }

  function skipMove() {
    if(phase == 0 || phase == 1) {
      let success = handleMove(MOVE_SKIP, MOVE_SKIP)
      setMoveSrcIdx(MOVE_SKIP)
      setMoveDstIdx(MOVE_SKIP)
      if(success) {
        setPhase(2)
        setGameStatus("Player " + (game.game.currentPlayer+1) + "'s ability")
      }
    }
  }

  function skipAbility() {
    if(phase == 2 || phase == 3) {
      handleAbility(moveSrcIdx, moveDstIdx, ABILITY_SKIP, ABILITY_SKIP)
      setPhase(4)
      setGameStatus("Waiting for AI's action")
      AIAction()
    }
  }

  function AIAction() {
    createModule().then((Module) => {
      var computeAction = Module.cwrap('computeAIAction', 'number', ['string'], [])
      var boardStr = game.game.boardToString()
      let action = computeAction(boardStr)
      // action is a 9 digit int in form:
      // 1 moveSrcIdx moveDstIdx abilitySrcIdx abilityDstIdx
      // First digit is reserved as 1 to ensure that the action always has the same number of
      // digits.
      // Value 99 is reserved for MOVE_SKIP and ABILITY_SKIP.
      let moveSrcIdx = Math.floor(action / 1000000) % 100
      let moveDstIdx = Math.floor(action / 10000) % 100
      let abilitySrcIdx = Math.floor(action / 100) % 100
      let abilityDstIdx = action % 100

      if(moveSrcIdx == 99) { // skip move
        moveSrcIdx = MOVE_SKIP
        moveDstIdx = MOVE_SKIP
      }
      if(abilitySrcIdx == 99) { // skip ability
        abilitySrcIdx = ABILITY_SKIP
        abilityDstIdx = ABILITY_SKIP
      }

      handleMove(moveSrcIdx, moveDstIdx)
      handleAbility(moveSrcIdx, moveDstIdx, abilitySrcIdx, abilityDstIdx)

      setMoveSrcIdx(MOVE_SKIP)
      setMoveDstIdx(MOVE_SKIP)
      setAbilitySrcIdx(ABILITY_SKIP)
      setAbilityDstIdx(ABILITY_SKIP)
      setLastMove({srcIdx: moveSrcIdx, dstIdx: moveDstIdx})
      setLastAbility({srcIdx: abilitySrcIdx, dstIdx: abilityDstIdx})
      setPhase(0)
      setGameStatus("Player " + (game.game.currentPlayer+1) + "'s move")
      let gameOver = game.game.gameOver();
      let winner = game.game.winner();
      if(gameOver) {
        alert('You LOSE!')
        game.game.reset()
        updateView()
      }

    })
  }
  
  const statusStyle = {
    'padding': '10px',
    'color': 'white'
  }

  /*
   * Game is indexed bottom up. For a hypothetical 3x3 board this would look like:
   * 6 7 8
   * 3 4 5
   * 0 1 2
   * Web view is indexed top down. For a 3x3 board, this would look like:
   * 0 1 2
   * 3 4 5
   * 6 7 8
   * This function converts a web index to a game index.
   */
  function webIndexToGameIndex(i) {
    return i % 8 + (Math.abs(Math.floor(i / 8) - 7)) * 8  
  }

  return (
    <div className='board'>
      <div className='board'>
        {board.flat().map((piece, i) => (
          <div key={i} className="square" onClick={() => handleClick(webIndexToGameIndex(i))}>
              <BoardSquare piece={piece} bgClass={getBgClass(webIndexToGameIndex(i))} />
          </div>
        ))}
      </div>
      <div>
        <div style={statusStyle}>
          <button type="button" onClick={skipMove}>Skip Move</button> - <button type="button" onClick={skipAbility}>Skip Ability</button>
        </div>
        <div style={statusStyle}>
          Status: {gameStatus}
        </div>
      </div>

    </div>
  )
}
