import bot from "../config/bot.config.js";
import { GETALLJOBS } from "../query/job.query.js";
import { ADDWORKERID, CANCEL_WORKER, EXISTINGWORKER, EXISTINGWORKERID, REGISTERWORKER } from "../query/worker.query.js";
import { fetchData } from "../utils/postgres.js";

const register = bot.onText(/\/start/, async(msg) => {
    try {
        const chatid = msg.chat.id
        const existingWorker = await fetchData(EXISTINGWORKER, Number(chatid))
        if (existingWorker && existingWorker.length) {
            bot.sendMessage(chatid, 'you already registered')
            return;
        }
        bot.sendMessage(chatid, `Assalom Aleykum ${msg.from.first_name}, rolingizni tanlang`, {
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

const selectJob = bot.on('callback_query', async(msg) => {
    try {
        const chatid = msg.message.chat.id
        const allJobs = await fetchData(GETALLJOBS)
        const arrJobs = []
        for (let val of allJobs) {
            let toArray = [{ text: val.job_title, callback_data: "jobs" }]
            console.log(toArray);
            arrJobs.push(toArray)
        }
        switch (msg.data) {
            case 'worker':
                if (arrJobs.length > 3) {
                    arrJobs.length = 4
                    arrJobs.push([{ text: "...", callback_data: "other_jobs" }])
                } else
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

const showRegistration = bot.on('callback_query', (msg) => {
    try {
        const chatid = msg.message.chat.id
        console.log(msg);
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


            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
})

const startRegister = bot.on('callback_query', async(msg) => {
    try {
        console.log('dddddddddddddddddddddddd', msg.data);
        const chatid = msg.message.chat.id

        switch (msg.data) {
            case 'register':
                let registerWorker = await fetchData(ADDWORKERID, msg.message.chat.id)
                console.log(registerWorker);
                bot.sendMessage(chatid, 'ismingizni kiriting. \n masalan: Ali Valiyev')
                bot.on('message', m => {
                    bot.sendMessage(chatid, 'keyingi bosqich: endi telefon raqamni kiriting', {
                        reply_markup: {
                            inline_keyboard: [
                                [{
                                    text: "Back <-",
                                    callback_data: "back",
                                }],
                            ],
                            resize_keyboard: true,
                        },
                    })
                    bot.on('message', () => {
                        bot.sendMessage(chatid, 'keyingi bosqich: Ustaxona nomini kiriting', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                        text: "Back <-",
                                        callback_data: "back",
                                    }],
                                ],
                                resize_keyboard: true,
                            },
                        })
                        bot.on('message', () => {
                            bot.sendMessage(chatid, 'keyingi bosqich: Manzilni kiriting', {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{
                                            text: "Back <-",
                                            callback_data: "back",
                                        }],
                                    ],
                                    resize_keyboard: true,
                                },
                            })
                        })
                    })
                })
                break;

            case 'back':
                const findWorker = await fetchData(EXISTINGWORKERID, chatid)
                if (!findWorker.length) {
                    bot.sendMessage(chatid, 'ok')
                } else {
                    const deleteWorker = await fetchData(CANCEL_WORKER, chatid)
                    bot.sendMessage(chatid, "qayta ro'yhatdan o'tish uchun /start ga bosing")
                }
                break;

            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
})



const ontext = bot.on('location', (msg) => {
    console.log(msg);
    bot.sendMessage(msg.chat.id, 'locatsiya')
})

export default {
    register,
    selectJob,
    showRegistration,
    startRegister,
    ontext
}