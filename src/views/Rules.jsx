import { Link } from 'react-router-dom'

function Rules() {
  return (
    <div className="main">
      <div className="text-container">
        <h2>Rules</h2>
        <p>On each turn, you can move 1 unit and use 1 ability, in that order.</p>
        <p>You can skip the move or the ability by pressing the skip button.</p>
        <p>Goal of the game is to kill the enemy king.</p>
        <p>Units have 2 numbers next to them. The one on the left is their health points and the one on the right is their ability points.</p>
        <p>When a unit loses its health points, it's removed from the game.</p>
        <p>Ability points determine how much damage a unit can do to another unit.</p>
        <p>If you selected the wrong piece, you can unselect it by clicking it again.</p>
        <p>Units do single target damage with their abilities, except for mage, who also damages all opponent's neighbouring units.</p>
      </div>
    </div>
  )
}

export default Rules
