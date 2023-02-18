import bot from "../config/bot.config.js";
import { fetchData } from "../utils/postgres.js";

const register = bot.onText(/\/start/, (msg) => {
    try {
        bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Usta",
                        callback_data: "worker",
                    }],
                    [{
                        text: "Mijoz ",
                        callback_data: "customer",
                    }],
                ],
                resize_keyboard: true,
            },
        });
    } catch (error) {
        console.log(error);
    }
})

const checkJob = bot.on('callback_query', (msg) => {
    try {
        const chatid = msg.message.chat.id

        switch (msg.data) {
            case 'worker':
                bot.sendMessage(chatid, 'do you want to register?', {
                    reply_markup: {
                        inline_keyboard: [
                            // [{
                            //     text: "Register",
                            //     callback_data: "register",
                            // }],
                            // [{
                            //     text: "Back <-",
                            //     callback_data: "back",
                            // }],
                        ],
                        resize_keyboard: true,
                    },
                })
        }
    } catch (error) {
        console.log(error);
    }
})

const checkRegister = bot.on('callback_query', (msg) => {
    try {
        const chatid = msg.message.chat.id
        switch (msg.data) {
            case 'jobs':
                bot.sendMessage(chatid, 'do you want to register?', {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: "Register",
                                callback_data: "register",
                            }],
                            [{
                                text: "Back <-",
                                callback_data: "back",
                            }],
                        ],
                        resize_keyboard: true,
                    },
                })
                break;

            case 'register':
                bot.sendMessage(chatid, 'ismingizni kiriting. \n masalan: Ali Valiyev')


            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
})


bot.on('message', (msg) => {

})

export default {
    register,
    checkJob,
    checkRegister
}