const createHttpError = require('http-errors');
const { ChatMessage, User, Chat } = require('../db/models');

module.exports.addMessage = async (req, res, next) => {
  try {
    const {
      body: { authorId, text },
      params: { chatId },
    } = req;

    const chat = await Chat.findByPk(chatId);

    if (!chat) {
      throw createHttpError(404, 'Chat not found');
    }

    const user = await User.findByPk(authorId);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const message = await ChatMessage.create({
      text,
      authorId,
      chatId,
    });

    const messageToSend = message.toJSON();
    
    messageToSend.author = {id: user.id, firstName: user.firstName, lastName: user.lastName};

    res.status(201).send({ data: messageToSend });
  } catch (error) {
    next(error);
  }
};

module.exports.getMessagesForChat = async (req, res, next) => {
  try {
    const { params: { chatId } } = req;

    const chat = await Chat.findByPk(chatId, {
      include: {
        model: ChatMessage,
        as: 'messages',
        include: {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName'],
        },
      },
      order: [[{ model: ChatMessage, as: 'messages' }, 'createdAt', 'ASC']],
    });

    if (!chat) {
      throw createHttpError(404, 'Chat not found');
    }

    return res.status(200).send({ data: chat.messages });
  } catch (error) {
    next(error);
  }
};
