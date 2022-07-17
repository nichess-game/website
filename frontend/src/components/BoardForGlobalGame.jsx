import React, { useState, useEffect } from 'react'
import BoardSquare from './BoardSquare'
import { Player } from '../constants/constants.js'
import { handleMove, handleAbility, updateView } from '../Game'

export default function BoardForGlobalGame({board, game}) {
  const [phase, setPhase] = useState(0)
  const [movementSourceCoordinates, setMovementSourceCoordinates] = useState({})
  const [movementDestinationCoordinates, setMovementDestinationCoordinates] = useState({})
  const [abilitySourceCoordinates, setAbilitySourceCoordinates] = useState({})
  const [abilityDestinationCoordinates, setAbilityDestinationCoordinates] = useState({})
  const [legalMoves, setLegalMoves] = useState([])
  const [legalAbilities, setLegalAbilities] = useState([])
  const [socket, setSocket] = useState()
  const [onMessageAdded, setOnMessageAdded] = useState(false) // TODO: is there a better way to do this?
  const [initialRenderDone, setInitialRenderDone] = useState(false) // TODO: is there a better way to do this?
  const [lastMove, setLastMove] = useState({srcX: -1, srcY: -1, dstX: -1, dstY: -1})
  const [lastAbility, setLastAbility] = useState({srcX: -1, srcY: -1, dstX: -1, dstY: -1})


  useEffect(() => {
    // Create WebSocket connection.
    var WS_HOST = window.location.origin.replace(/^http/, 'ws')
    WS_HOST = 'ws://localhost:3001' // uncomment if running locally
    const socket = new WebSocket(WS_HOST);

    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log('Connected to WS Server')
    });
    socket.addEventListener('close', function (event) {
        console.log('Disconnected from WS Server')
    });

    setSocket(socket)
    return () => {
      socket.close();
    }

  }, [])

  useEffect(() => {
    if((!game.game) || initialRenderDone)
      return
    var HOST = window.location.origin
    fetch(HOST + '/global-game')
      .then(response => response.text())
      .then(data => {
        game.game.boardFromString(data)
        updateView()
      })
    var history = game.game.history()
    if(history.length == 0) {
      setLastMove({ srcX: -1, srcY: -1, dstX: -1, dstY: -1 })
      setLastAbility({ srcX: -1, srcY: -1, dstX: -1, dstY: -1 })
    } else {
      setLastMove(history[history.length-1][0])
      setLastAbility(history[history.length-1][1])
    }

    setInitialRenderDone(true)
  }, [game, initialRenderDone])

  useEffect(() => {
    if(!game.game)
      return
    var history = game.game.history()
    if(history.length == 0) {
      setLastMove({ srcX: -1, srcY: -1, dstX: -1, dstY: -1 })
      setLastAbility({ srcX: -1, srcY: -1, dstX: -1, dstY: -1 })
    } else {
      setLastMove(history[history.length-1][0])
      setLastAbility(history[history.length-1][1])
    }
  }, [game])


  useEffect(() => {
    if((!socket) || (!game) || (onMessageAdded))
      return
    socket.addEventListener('message', function (event) {
      const encodedBoard = event.data.slice(1,-1);
      game.game.boardFromString(encodedBoard)
      updateView()
    });
    setOnMessageAdded(true)

  }, [game, socket, onMessageAdded])


  function getXYPosition(i) {
    const x = i % 8
    const y = Math.abs(Math.floor(i / 8) - 7)
    return {x, y}
  }
  function getIndexFromXY(x, y) {
    //return y*8 + x
    return Math.abs(7-y)*8 + x // TODO: this looks wrong but gives the right output
  }
  function isLastMove(i) {
    const {x, y} = getXYPosition(i)
    return (lastMove.srcX == x && lastMove.srcY == y) || (lastMove.dstX == x && lastMove.dstY == y)
  }
  function isLastAbility(i) {
    const {x, y} = getXYPosition(i)
    return (lastAbility.srcX == x && lastAbility.srcY == y) || (lastAbility.dstX == x && lastAbility.dstY == y)
  }

  function isBlack(i) {
    const {x, y} = getXYPosition(i)
    return (x + y) % 2 == 1
  }
  function isSelectedAsMovementSource(i) {
    const {x, y} = getXYPosition(i)
    if(x === movementSourceCoordinates.x && y === movementSourceCoordinates.y){
      return true
    }
    return false
  }

  function isSelectedAsAbilitySource(i) {
    const {x, y} = getXYPosition(i)
    if(x === abilitySourceCoordinates.x && y === abilitySourceCoordinates.y){
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


  function handleMovementSourceSelection(coordinates) {
    const gameObject = game.game.getGameObjectByCoordinates(coordinates.x, coordinates.y)
    setMovementSourceCoordinates(coordinates)
    let legalMoves = game.game.legalMoves(coordinates.x, coordinates.y)
    let moveIndices = legalMoves.map(coordinates => getIndexFromXY(coordinates.dstX, coordinates.dstY))
    if(legalMoves.length != 0) {
      setLegalMoves(moveIndices)
      setPhase(1)
    }
    return
  }
  function handleMovementDestinationSelection(coordinates) {
    if(coordinates.x == movementSourceCoordinates.x && coordinates.y == movementSourceCoordinates.y){
      setPhase(0)
      return
    }
    const gameObject = game.game.getGameObjectByCoordinates(coordinates.x, coordinates.y)
    if(gameObject.player != Player.NO_PLAYER) {
      return
    }
    setMovementDestinationCoordinates(coordinates)
    let success = handleMove(movementSourceCoordinates.x, movementSourceCoordinates.y, coordinates.x, coordinates.y)
    if(success) {
      setPhase(2)
    }

    return
  }
  function handleAbilitySourceSelection(coordinates) {
    const gameObject = game.game.getGameObjectByCoordinates(coordinates.x, coordinates.y)
    setAbilitySourceCoordinates(coordinates)
    let legalAbilities = game.game.legalAbilities(coordinates.x, coordinates.y)
    let abilityIndices = legalAbilities.map(coordinates => getIndexFromXY(coordinates.dstX, coordinates.dstY))
    if(legalAbilities.length != 0) {
      setLegalAbilities(abilityIndices)
      setPhase(3)
    }
    return
  }
  function handleAbilityDestinationSelection(coordinates) {
    if(coordinates.x == abilitySourceCoordinates.x && coordinates.y == abilitySourceCoordinates.y){
      setPhase(2)
      return
    }

    const gameObject = game.game.getGameObjectByCoordinates(coordinates.x, coordinates.y)
    setAbilityDestinationCoordinates(coordinates)
    let success = handleAbility(abilitySourceCoordinates.x, abilitySourceCoordinates.y, coordinates.x, coordinates.y)

    
    if(success) {
      let x1 = movementSourceCoordinates.x
      let y1 = movementSourceCoordinates.y
      let x2 = movementDestinationCoordinates.x
      let y2 = movementDestinationCoordinates.y
      let x3 = abilitySourceCoordinates.x
      let y3 = abilitySourceCoordinates.y
      let x4 = coordinates.x
      let y4 = coordinates.y

      socket.send(x1+','+y1+','+x2+','+y2+','+x3+','+y3+','+x4+','+y4)

      setMovementSourceCoordinates({ })
      setMovementDestinationCoordinates({ })
      setAbilitySourceCoordinates({ })
      setAbilityDestinationCoordinates({ })
      setPhase(0)
    }
    let [gameOver, winner] = game.game.gameOver()
    if(gameOver) {
      game.game.reset()
      updateView()
    }
    return
  }


  function handleClick(i) {
    const coordinates = getXYPosition(i)
    if(phase == 0) {
      handleMovementSourceSelection(coordinates)
    } else if(phase == 1) {
      handleMovementDestinationSelection(coordinates)
    } else if(phase == 2) {
      handleAbilitySourceSelection(coordinates)
    } else if(phase == 3) {
      handleAbilityDestinationSelection(coordinates)
    }
  }

  return <div className='board'>
    {board.flat().map((piece, i) => (
      <div key={i} className="square" onClick={() => handleClick(i)}>
          <BoardSquare piece={piece} bgClass={getBgClass(i)} />
      </div>
    ))}
  </div>
}
