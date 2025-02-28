const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const serverConfig = require('./configs/server.json');

const PORT = serverConfig.PORT;
const HOST = serverConfig.HOST;

const server = http.createServer(app);

// io - екземпляр сервера вебсокетів
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

/*
  on - аналог addEventListener з DOM
  1 аргумент - назва події
  2 аргумент - коллбек який треба запсустити коли прийшла подія
*/
io.on('connection', (socket) => {

  // socket - це екземпляр з'еднання з клієнтом
  console.log('socket connected to server');
});

server.listen(PORT, HOST, () => {
  console.log(`Server started on port ${HOST}:${PORT}`);
});
