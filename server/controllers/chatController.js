const createHttpError = require('http-errors');
const { User, Chat, ChatMessage } = require('../db/models');
const ChatService = require('../services/chat.service');

module.exports.createChat = async (req, res, next) => {
  try {
    const { body, file = {}, tokenData: {id: userId} } = req;

    const chat = await ChatService.createChat({
      ...body,
      userId,
      file,
    });

    res.status(201).send({ data: chat });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToChat = async (req, res, next) => {
  try {
    const {
      params: { userId, chatId },
    } = req;

    const chat = await Chat.findByPk(chatId);

    if (!chat) {
      throw createHttpError(404, 'Chat not found');
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    await chat.addUser(user);

    res.status(200).send({
      data: {
        user,
        chat,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserChats = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: {
        model: Chat,
        as: 'chats',
        through: { attributes: [] },
      },
    });

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).send({ data: user.chats });
  } catch (error) {
    next(error);
  }
};
