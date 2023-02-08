import TelegramApi from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

const chat_id = [];

const start = async () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Описание возможностей бота' },
  ]);

  bot.on('message', async (msg) => {
    chat_id.push(msg.message_id);
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text == '/start') {
      await bot
        .sendMessage(chatId, 'Привет! Это бот, написанный тавером', {
          reply_markup: {
            keyboard: [[{ text: 'Информация' }], [{ text: 'Удалить историю чата' }]],
            resize_keyboard: true,
          },
        })
        .then((res) => chat_id.push(res.message_id));
      await bot.sendMessage(chatId, 'Кстати, это я').then((res) => chat_id.push(res.message_id));
      await bot
        .sendSticker(
          chatId,
          'CAACAgIAAxkBAAMZY-LX0JWfpfK1-iw-UvXXTPOdl48AAqwiAAIJGGFLpHMjiYebWFUuBA',
        )
        .then((res) => chat_id.push(res.message_id));
    } else if (text == '/info' || text == 'Информация') {
      await bot
        .sendMessage(chatId, 'Я представлю один из проектов тавера, а именно: todo list')
        .then((res) => chat_id.push(res.message_id));
      await bot
        .sendMessage(
          chatId,
          'Коротко о проекте: данный список задач имеет функцию регистрации, привязка учетной записи к базе данных, с последующим сохранением записей.',
        )
        .then((res) => chat_id.push(res.message_id));
      await bot
        .sendMessage(chatId, 'Стэк: TypeScript, React, React Router, SCSS, Firebase storage')
        .then((res) => chat_id.push(res.message_id));
      await bot
        .sendMessage(
          chatId,
          'Также предоставляю ссылку на github репоизиторий: https://github.com/tawerx/todolist',
        )
        .then((res) => chat_id.push(res.message_id));
      await bot
        .sendMessage(
          chatId,
          'Также предоставляю ссылку на опубликованный проект: https://todo-list-tawer.vercel.app/',
        )
        .then((res) => chat_id.push(res.message_id));
      await bot
        .sendMessage(
          chatId,
          'Также у меня есть поддержка встроенного веб приложения, ты можешь нажать на кнопку todo в левом нижнем углу и пользоваться списком задач',
        )
        .then((res) => chat_id.push(res.message_id));
    } else if (text == 'Удалить историю чата') {
      chat_id.forEach((id) => {
        bot.deleteMessage(chatId, id);
      });
      chat_id.splice(0, chat_id.length);
    } else {
      await bot
        .sendMessage(chatId, 'Я тебя не понимаю')
        .then((res) => chat_id.push(res.message_id));
      await bot
        .sendSticker(
          chatId,
          'CAACAgIAAxkBAAMZY-LX0JWfpfK1-iw-UvXXTPOdl48AAqwiAAIJGGFLpHMjiYebWFUuBA',
        )
        .then((res) => chat_id.push(res.message_id));
    }
  });
};

start();
