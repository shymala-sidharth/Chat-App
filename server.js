const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//static folder
app.use(express.static(path.join(__dirname, 'public')))

//run when client connects
io.on('connection', (socket) => {
  console.log('New WS Connection...')

  socket.emit('message', 'Welcome to Chat Well Revolution!')

  //broadcast when a user connects
  socket.broadcast.emit('message', 'A User Has Joined The Chat')

  //runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A User Has Left The Chat')
  })

  //listen for chatMessage
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg)
  })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
