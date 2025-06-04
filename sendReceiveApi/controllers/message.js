import queueService from "../services/queue.js";
import authService from "../services/authService.js";
 
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

function messageWorker(req, res) {
    const { userIdSend, userIdReceive } = req.body;

    console.log(userIdSend, userIdReceive);

    res.json({ msg: "ok" });
}

export default {
    sendMessage,
    messageWorker
}
