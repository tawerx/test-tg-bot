import TelegramApi from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase.js';

dotenv.config();

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

const chat_id = [];

const start = async () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Описание бота' },
  ]);
  bot.on('message', async (msg) => {
    chat_id.push(msg.message_id);
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text == '/start') {
      try {
        await bot
          .sendMessage(
            chatId,
            'Привет! Это бот, написанный тавером \n\nКстати, это мой разработчик',
            {
              reply_markup: {
                keyboard: [
                  [{ text: 'Информация' }],
                  [
                    { text: 'Cat food' },
                    { text: 'Todo list' },
                    { text: 'YouTube Cinema' },
                    { text: 'Gartic Show' },
                  ],
                ],
                resize_keyboard: true,
              },
            },
          )
          .then((res) => chat_id.push(res.message_id));
        await bot
          .sendSticker(
            chatId,
            'CAACAgIAAxkBAAMZY-LX0JWfpfK1-iw-UvXXTPOdl48AAqwiAAIJGGFLpHMjiYebWFUuBA',
          )
          .then((res) => chat_id.push(res.message_id));
      } catch (error) {
        console.log(error);
      }
    } else if (text == '/info' || text == 'Информация') {
      try {
        await bot
          .sendMessage(
            chatId,
            'Я выступаю в роли портфолио этого чела (tawer). Я являюсь хранителем, а именно во мне есть информация о всех проектах моего разработчика. Чтобы узнать поподробнее о проекта, просто выбери интересующий тебя проект кнопками ниже.',
          )
          .then((res) => chat_id.push(res.message_id));
      } catch (error) {
        console.log(error);
      }
    } else if (text == 'Todo list') {
      const todoRef = ref(storage, 'vidTodo.mp4');
      try {
        await getDownloadURL(todoRef).then(async (res) => {
          try {
            await bot.sendAnimation(chatId, res);
          } catch (error) {
            console.log(error);
          }
        });

        await bot
          .sendMessage(
            chatId,
            `Коротко о проекте: данный список задач имеет функцию регистрации, привязка учетной записи к базе данных, с последующим сохранением записей. \n\nГостевой вход: \nlogin: test \npassword:testt \n\nСтэк: TypeScript, React, React Router, Redux Toolkit, SCSS, Firebase storage \n\nТакже предоставляю ссылку на github репоизиторий: https://github.com/tawerx/todolist \n\nТакже предоставляю ссылку на опубликованный проект: https://todo-list-tawer.vercel.app/ \n\nТакже у меня есть поддержка встроенного веб приложения, ты можешь нажать на кнопку "Открыть приложение" и пользоваться списком задач`,
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Открыть приложение', web_app: { url: process.env.APP_URL_TODOLIST } }],
                ],
              },
            },
          )
          .then((res) => chat_id.push(res.message_id));
      } catch (error) {
        console.log(error);
      }
    } else if (text == 'YouTube Cinema') {
      const cinemaRef = ref(storage, 'cinema.mp4');
      try {
        await getDownloadURL(cinemaRef).then(async (res) => {
          try {
            await bot.sendAnimation(chatId, res);
          } catch (error) {
            console.log(error);
          }
        });
        await bot
          .sendMessage(
            chatId,
            `Коротко о проекте: данный youtube кинотеатр является синхронным, поддерживает создание комнат, с распределением ролей внутри. Данный проект поддерживает просмотр всех видеороликов платформы youtube, за исключением материалов, на которых есть возрастные ограничения. \n\nСтэк: React, Socket.io, Redux toolkit, React Router, SCSS \n\nТакже предоставляю ссылку на github репоизиторий: https://github.com/tawerx/react-youtube-cinema-frontend \n\nТакже предоставляю ссылку на опубликованный проект: https://cinema.tawerdev.ru/ \n\nТакже у меня есть поддержка встроенного веб приложения, ты можешь нажать на кнопку "Открыть приложение" и пользоваться кинотеатром`,
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Открыть приложение', web_app: { url: process.env.APP_URL_CINEMA } }],
                ],
              },
            },
          )
          .then((res) => chat_id.push(res.message_id));
      } catch (error) {
        console.log(error);
      }
    } else if (text == 'Gartic Show') {
      const garticRef = ref(storage, 'gartic.mp4');
      try {
        await getDownloadURL(garticRef).then(async (res) => {
          try {
            await bot.sendAnimation(chatId, res);
          } catch (error) {
            console.log(error);
          }
        });
        await bot
          .sendMessage(
            chatId,
            `Коротко о проекте: данный проект является копией gartic.io, ну как копией, в данный момент тут процентов 30 от оригинала :), разработчик надоел отдыхать и не дорабатывать этот проект, дизреспект ему от меня!! Ладно, не обижайся, если ты читаешь это :) \n\n Стэк: React, Socket.io, Redux toolkit, SCSS \n\nТакже предоставляю ссылку на github репоизиторий: https://github.com/tawerx/react-gartic-show-frontend \n\nТакже предоставляю ссылку на опубликованный проект: https://tawerdev.ru/ \n\nТакже у меня есть поддержка встроенного веб приложения, ты можешь нажать на кнопку "Открыть приложение" и пользоваться рисовалкой`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Открыть приложение',
                      web_app: { url: process.env.APP_URL_GARTICSHOW },
                    },
                  ],
                ],
              },
            },
          )
          .then((res) => chat_id.push(res.message_id));
      } catch (error) {
        console.log(error);
      }
    } else if (text == 'Cat food') {
      const catFoodRef = ref(storage, 'catfood.mp4');
      try {
        await getDownloadURL(catFoodRef).then(async (res) => {
          try {
            await bot.sendAnimation(chatId, res);
          } catch (error) {
            console.log(error);
          }
        });
        await bot
          .sendMessage(
            chatId,
            `Коротко о проекте: данный проект был одним из тестовых заданий в компанию, увы у меня это не приняли, но я оставил это у себя и переписал это на NEXT JS как SSG(static site generation) \n\nСтэк: NEXT JS, SCSS \n\nТакже предоставляю ссылку на github репоизиторий: https://github.com/tawerx/cat-food \n\nТакже предоставляю ссылку на опубликованный проект: ${process.env.APP_URL_CATFOOD} \n\nТакже у меня есть поддержка встроенного веб приложения, ты можешь нажать на кнопку "Открыть приложение" и пользоваться вымышленным интернет магазином с кошачьей едой`,
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Открыть приложение', web_app: { url: process.env.APP_URL_CATFOOD } }],
                ],
              },
            },
          )
          .then((res) => chat_id.push(res.message_id));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await bot
          .sendMessage(chatId, 'Я тебя не понимаю')
          .then((res) => chat_id.push(res.message_id));
        await bot
          .sendSticker(
            chatId,
            'CAACAgIAAxkBAAMZY-LX0JWfpfK1-iw-UvXXTPOdl48AAqwiAAIJGGFLpHMjiYebWFUuBA',
          )
          .then((res) => chat_id.push(res.message_id));
      } catch (error) {
        console.log(error);
      }
    }
  });
};

start();
