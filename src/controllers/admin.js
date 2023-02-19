import bot from "../config/bot.config.js";
import { config } from "dotenv";
import { fetchData } from "../utils/postgres.js";
import { EXISTINGWORKER } from "../query/worker.query.js";
config()
const AdminID = process.env.ADMIN_ID

const BanUser = bot.onText(/\/ban/, async(msg) => {
    try {
        const chatid = msg.chat.id
        if (chatid == AdminID) {
            bot.setMyCommands([{
                command: "/ban",
                "description": "ban user"
            }])
            bot.sendMessage(chatid, 'type id to ban user')
            bot.on('message', b => {
                bot.banChatMember(msg.chat.id, b.text, 2)
            })
        } else {
            bot.sendMessage(chatid, 'you cannot use this command')
        }
    } catch (error) {
        console.log(error);
    }
})

const AdminChecking = bot.on('callback_query', async(msg) => {
    try {

        switch (msg.data) {
            case "check":
                const checkWorker = await fetchData(EXISTINGWORKER, msg.message.chat.id)[0]
                let WorkerData = `
worker_name: ${checkWorker.worker_name}
worker_phone: ${checkWorker.worker_phone}
accept_id:  ${checkWorker.accept_id}
`
                    // console.log(checkWorker, 'worker dataaa', WorkerData);
                bot.sendMessage(AdminID, WorkerData)
                bot.sendMessage(AdminID, `@${msg.message.chat.username} send request to work`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: "Test",
                                callback_data: "dfdf",
                            }],
                            [{
                                text: "Test ",
                                callback_data: "custsdfsdomer",
                            }],
                        ],
                        resize_keyboard: true,
                    },
                })
                break;
        }
    } catch (error) {
        console.log(error);
    }
})


export default {
    AdminChecking,
    BanUser
}