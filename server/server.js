const http = require('http');
const app = require('./app');
const serverConfig = require('./configs/server.json');

const PORT = serverConfig.PORT;
const HOST = serverConfig.HOST;

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server started on port ${HOST}:${PORT}`);
});
