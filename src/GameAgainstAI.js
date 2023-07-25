import { BehaviorSubject } from 'rxjs'
import { Game, GameCache, pieceBelongsToPlayer, PieceType, MOVE_SKIP } from 'nichess'


const gameCache = new GameCache()
const game = new Game(gameCache)

export const gameSubject = new BehaviorSubject({
  board: game.board2D(),
  game: game
})

export function handleMove(srcIdx, dstIdx) {
  if(srcIdx == MOVE_SKIP && dstIdx == MOVE_SKIP) return true
  game.makeMove(srcIdx, dstIdx)
  gameSubject.next({ board: game.board2D(), game: game })
  return true
}

export function handleAbility(moveSrcIdx_, moveDstIdx_, abilitySrcIdx_, abilityDstIdx_) {
  if(moveSrcIdx_ != MOVE_SKIP && moveDstIdx_ != MOVE_SKIP) {
    game.undoMove(moveSrcIdx_, moveDstIdx_)
  }
  game.makeAction(moveSrcIdx_, moveDstIdx_, abilitySrcIdx_, abilityDstIdx_)
  gameSubject.next({ board: game.board2D(), game: game })
  return true
}

export function pieceBelongsToCurrentPlayer(squareIdx) {
  const piece = game.getPieceBySquareIndex(squareIdx)
  return pieceBelongsToPlayer(piece.type, game.currentPlayer)
}

export function isSquareEmpty(squareIdx) {
  const piece = game.getPieceBySquareIndex(squareIdx)
  return piece.type == PieceType.NO_PIECE
}

export function updateView() {
  gameSubject.next({ board: game.board(), game: game })
}


