import { Link } from 'react-router-dom'

function Rules() {
  return (
    <div className="main">
      <div className="text-container">
        <h2>Rules</h2>
        <p> I'll write more detailed rules, but I'm really tired now so this will do.</p>
        <p>Goal of the game is to kill the enemy king.</p>
        <p>On each turn, you need to move 1 unit and use 1 ability.</p>
        <p><i>If you selected the wrong piece, you can unselect it by clicking it again.</i></p>
        <p>Units have 2 numbers above them. Left is their Health Points and right is their Ability Points.</p>
        <p>Pawns have the ability to build a new wall on an empty square or destroy an existing one.</p>
        <p>Other units do single target damage with their abilities, except for mage, who also damages all opponent's neighbouring units.</p>
        <p>You always have to move a unit, but you can effectively skip the ability by using it on an empty square(not with pawn though).</p>
      </div>
    </div>
  )
}

export default Rules
