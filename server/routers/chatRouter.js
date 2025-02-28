const chatRouter = require('express').Router();
const ChatController = require('../controllers/chatController');
const ChatMessageController = require('../controllers/chatMessageController');
const { imagesUpload } = require('../utils/multer');

chatRouter.post('/', imagesUpload.single('chatImage'), ChatController.createChat);
chatRouter.post('/:chatId/users/:userId', ChatController.addUserToChat);
chatRouter.get('/users/:userId', ChatController.getUserChats);



chatRouter.post('/:chatId/messages', ChatMessageController.addMessage);
chatRouter.get('/:chatId/messages', ChatMessageController.getMessagesForChat);


module.exports = chatRouter;
