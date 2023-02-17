import { Link } from 'react-router-dom'

function Play() {
  return (
    <div className="main">
      <div className="text-container">
        <p><Link className="light-link" to="/play-against-ai">1) Play against AI</Link></p>
        <p><Link className="light-link" to="/play-against-self">2) Play against yourself</Link></p>
      </div>
    </div>
  )
}

export default Play
