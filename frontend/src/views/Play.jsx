import { Link } from 'react-router-dom'

function Play() {
  return (
    <div className="main">
      <div className="text-container">
        <p><Link className="light-link" to="/play-against-ai">1) Play against AI(very bad rn)</Link></p>
        <p><Link className="light-link" to="/play-against-the-world">2) Play against The World</Link></p>
        <p><Link className="light-link" to="/play-against-self">3) Play against yourself</Link></p>
      </div>
    </div>
  )
}

export default Play
