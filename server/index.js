import { Game } from './Game/game.js'
//const Game = require('./Game/game.js')

const path = require('path')


const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const server = require('http').createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

const game = new Game()

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  console.log('clients size: ' + wss.clients.size)

  ws.on('message', function incoming(message) {
    let s = message.toString('utf-8').split(',')
    let x1 = parseInt(s[0])
    let y1 = parseInt(s[1])
    let x2 = parseInt(s[2])
    let y2 = parseInt(s[3])
    let x3 = parseInt(s[4])
    let y3 = parseInt(s[5])
    let x4 = parseInt(s[6])
    let y4 = parseInt(s[7])

    

    let success1 = game.move(x1,y1,x2,y2)
    let success2 = game.ability(x3,y3,x4,y4)
    let [gameOver, winner] = game.gameOver()
    if(gameOver)
      game.reset()
    let response = game.boardToString()

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(response));
      }
    });
  });
});


const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};


app.get("/global-game", (req, res) => {
  res.send(game.boardToString())
});

app.get("/reset-global-game", (req, res) => {
  game.reset()
  var encodedBoard = game.boardToString()
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(encodedBoard));
    }
  });
});


app.use(express.static(path.resolve(__dirname, '../private-game-front/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'../private-game-front/build', 'index.html'));
});

server.listen(PORT, () => console.log(`Lisening on port :${PORT}`))
