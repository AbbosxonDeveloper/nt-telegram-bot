import bot from "../config/bot.config.js";
import { GETALLJOBS } from "../query/job.query.js";
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

const checkJob = bot.on('callback_query', async(msg) => {
    try {
        const chatid = msg.message.chat.id
        const allJobs = await fetchData(GETALLJOBS)
        const arrJobs = []
        for (let val of allJobs) {
            let toArray = [{ text: val.job_title, callback_data: val.job_id }]
            console.log(toArray);
            arrJobs.push(toArray)
        }
        switch (msg.data) {
            case 'worker':
                if (arrJobs.length >= 3) {
                    arrJobs.length = 4
                    arrJobs.push([{ text: "...", callback_data: "other_jobs" }])
                }
                bot.sendMessage(chatid, 'Kasbingizni tanlang', {
                    reply_markup: JSON.stringify({
                        inline_keyboard: arrJobs,
                        resize_keyboard: true,
                    })
                })
            case 'other_jobs':
                bot.sendMessage(chatid, 'Kasbingizni tanlang', {
                    reply_markup: JSON.stringify({
                        inline_keyboard: arrJobs,
                        resize_keyboard: true,
                    })
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