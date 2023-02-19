import bot from "../config/bot.config.js";
import { GETALLJOBS } from "../query/job.query.js";
import { ADDWORKERID, CANCEL_WORKER, EXISTINGWORKER, EXISTINGWORKERID, REGISTERWORKER } from "../query/worker.query.js";
import { fetchData } from "../utils/postgres.js";
import { config } from "dotenv";
config()
const AdminID = process.env.ADMIN_ID

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
            // console.log(msg);
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


const onRegister = bot.on('callback_query', msg => {
    try {
        const chatid = msg.message.chat.id
        switch (msg.data) {
            case ("register"):
                bot.sendMessage(chatid, "Royhatdan o'tganingizni tasdiqlang:", {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: "Tekshirish ✅",
                                callback_data: "check",
                            }],
                            [{
                                text: "Bekor qilish ❌",
                                callback_data: "cancel",
                            }],
                            [{
                                text: "Admin bilan boglanish🔗",
                                callback_data: "toadmin",
                            }],
                        ],
                        resize_keyboard: false,
                    },
                })
                break;

            case ("toadmin"):
                bot.sendMessage(chatid, "matn kiriting, matningiz \n adminga yuboriladi:")
                bot.on("message", t => {
                    console.log(t.chat.username);
                    bot.sendMessage(AdminID, `@${t.chat.username} \n \n ${t.text}`)
                })
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
    onRegister,
    // startRegister,
    ontext
}