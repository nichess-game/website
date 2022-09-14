import { Game } from './Game/game.js'
import { BehaviorSubject } from 'rxjs'

const game = new Game()

export const gameSubject = new BehaviorSubject({
  board: game.board(),
  game: game
})

export function handleMove(pieceX, pieceY, destinationX, destinationY) {
  if(game.move(pieceX, pieceY, destinationX, destinationY)){
    gameSubject.next({ board: game.board(), game: game })
    return true
  }
  return false
}

export function handleAbility(pieceX, pieceY, destinationX, destinationY) {
  if(game.ability(pieceX, pieceY, destinationX, destinationY)){
    gameSubject.next({ board: game.board(), game: game })
    return true
  }
  return false
}

export function updateView() {
  gameSubject.next({ board: game.board(), game: game })
}
