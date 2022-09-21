import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="main">
      <div className="text-container">
        <h2>Nichess </h2>
        <p>Nichess is like chess, but units have health points and abilities. Why is this a good idea? When chess was first introduced, people didn't have computers so the rules had to be such that everyone could remember them. Now, many years later, those constraints no longer apply, so it's time to improve chess.</p>
        <p>This project is in very early days and it's likely that many things that you see now won't be in the later versions. Presently, you can either <Link className="light-link" to="play-against-self">play against yourself</Link>, <Link className="light-link" to="play-against-ai">play against AI</Link> or <Link className="light-link" to="play-against-the-world">play against another player</Link>.</p>
        <h2> Heroku </h2>
        <p>Nichess is currently hosted with Heroku free tier, which means that it will shut down if no one is using it. In that case, you just need to wait 10 seconds and refresh the page. Sometimes you'll get disconnected from the global game if you're idle for too long, which too can be fixed by refreshing the page.</p>
        <h2> Get involved </h2>
        <p><a className="light-link" href="https://github.com/nichess-game"> Nichess is free and open source</a>.</p>
        <p>More on this soon.</p>
        <h2> Credits </h2>
        <p> Wall, warrior and pawn icons made by <a className="light-link" href="https://www.flaticon.com/authors/freepik"> Freepik </a> from <a className="light-link" href="https://www.flaticon.com"> www.flaticon.com </a></p>
        <p> Assassin icon made by <a className="light-link" href="https://www.flaticon.com/authors/edtim"> edt.im </a> from <a className="light-link" href="https://www.flaticon.com"> www.flaticon.com </a></p>

        <p> Mage icon made by <a className="light-link" href="https://www.flaticon.com/authors/fjstudio"> fjstudio </a> from <a className="light-link" href="https://www.flaticon.com"> www.flaticon.com </a></p>
        <p> King icon made by <a className="light-link" href="https://www.flaticon.com/authors/creative-stall-premium"> Creative Stall Premium </a> from <a className="light-link" href="https://www.flaticon.com"> www.flaticon.com </a></p>

      </div>
    </div>
  )
}

export default About
