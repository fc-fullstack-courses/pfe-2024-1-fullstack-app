import { io } from "socket.io-client";
import CONSTANTS from "../constants";

// socket - екземпляр з'єднання з сервером
const socket = io(CONSTANTS.WS_SERVER_URL);