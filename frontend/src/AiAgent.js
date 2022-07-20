import { Game } from './Game/game.js'

/*
 * Tries every legal move and ability, and returns the one with the best score
 */
export function play(game, playerId) {
  var allMoves = []
  var bestScore = -100000
  var bestMove
  var bestAbility

  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      let p = game.getGameObjectByCoordinates(i, j)
      if(p.player === playerId) {
        let legalMoves = game.legalMoves(i, j)
        allMoves = allMoves.concat(legalMoves)
      }
    }
  }
  allMoves.forEach(function (move, index) {
    let g = new Game() 
    // create new game from the current game's state
    g.boardFromString(game.boardToString())
    g.move(move.srcX, move.srcY, move.dstX, move.dstY)
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        let p = g.getGameObjectByCoordinates(i, j)
        if(p.player !== playerId) {
          continue
        }
        let legalAbilities = g.legalAbilities(i, j)
        legalAbilities.forEach(function (ability, index2) {
          let g2 = new Game() 
          g2.boardFromString(g.boardToString())
          g2.ability(ability.srcX, ability.srcY, ability.dstX, ability.dstY)
          let score = calculateScore(g2, playerId)
          if(score > bestScore) {
            bestScore = score
            bestMove = move
            bestAbility = ability
          }
        })
      }
    }
  })
  return [bestMove, bestAbility]
}

function calculateScore(game, playerId) {
  var retval = 0;
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      let p = game.getGameObjectByCoordinates(i, j)
      if(p.player == 2){ // 2 is NO_PLAYER, i.e. empty
        continue
      }
      if(p.abilityPoints == 0) { // walls don't matter
        continue
      }
      let scoreMultiplier = 1 // pawn
      if(p.abilityPoints === 60) { // king
        scoreMultiplier = 20
      } else if(p.abilityPoints === 120) { // assassin
        scoreMultiplier = 10
      } else if(p.abilityPoints === 80) { // mage
        scoreMultiplier = 6
      } else if(p.abilityPoints === 100) { // warrior
        scoreMultiplier = 4
      }

      if(p.player !== playerId) {
        scoreMultiplier *= -1
      }

      retval += p.healthPoints * scoreMultiplier
    }
  }
  return retval
}
