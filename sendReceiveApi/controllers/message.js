import queueService from "../services/queue.js";
import authService from "../services/auth.js";
import recordService from "../services/record.js";
import redisClient from "../redisClient.js";
 
async function sendMessage(req, res) {
    const { userIdSend, userIdReceive, message } = req.body;
    const token = req.headers.authorization

    if (await authService.authenticateUser(userIdSend, token) !== true) {
        return res.status(498).json({ msg: "not auth" });
    }

    try {
        await queueService.sendMessage(`${userIdSend}${userIdReceive}`, message); 
    } catch (e) {
        console.log(e);
        return res.status(500).send("Internal server error");
    }

    res.json({ message: "mesage sended with success" });
}

async function messageWorker(req, res) {
    const { userIdSend, userIdReceive } = req.body;
    const token = req.headers.authorization

    if (await authService.authenticateUser(userIdSend, token) !== true) {
        return res.status(498).json({ msg: "not auth" });
    }

    const messages = await queueService.getAllMessagesFromQueue(`${userIdSend}${userIdReceive}`);

    await recordService.storeMessages(userIdSend, userIdReceive, messages);

    res.json(messages);
}

async function getAllMessagesByAUser(req, res) {
    const userId = req.query.userId
    const token = req.headers.authorization


    if (await authService.authenticateUser(userId, token) !== true) {
        return res.status(498).json({ msg: "not auth" });
    }

    try {
        let messages = await redisClient.get(userId + "getAllMessagesByUser");

        if (messages) {
            return res.json(JSON.parse(messages));
        }

        messages = await recordService.getAllMessagesByUser(userId);
        await redisClient.set(userId + "getAllMessagesByUser", JSON.stringify(messages), { EX: 20 });

        res.json(messages);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
    }
}

export default {
    sendMessage,
    messageWorker,
    getAllMessagesByAUser
}
