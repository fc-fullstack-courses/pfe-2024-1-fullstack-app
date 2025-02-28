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

  // додаємо слухач на подію з клієнта
  socket.on('userBtnClick', (param1, param2, param3, param4) => {
    console.log('userBtnClick event sent from client');

    console.log(param1); // 10
    console.log(param2); // 'test'
    console.log(param3); // [true, false, false, false]
    console.log(param4); // 'dark theme'

    // персональна єміт для конкретного клієнта події 'userBtnClick' (аналог res.send)
    // socket.emit('userBtnClick', false, null, 500, 'test user message');

    // єміт для всіх під'єднаних клієнтів події 'userBtnClick' 
    io.emit('userBtnClick', false, null, 500, 'test user message');
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server started on port ${HOST}:${PORT}`);
});
