import queueService from "../services/queue.js";
import authService from "../services/auth.js";
 
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

    const result = await queueService.getAllMessagesFromQueue(`${userIdSend}${userIdReceive}`);
    console.log("result:", result);

    res.json({ msg: "ok" });
}

export default {
    sendMessage,
    messageWorker
}
