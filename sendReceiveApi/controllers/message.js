import queueService from "../services/queue.js";
 
async function sendMessage(req, res) {
    const { userIdSend, userIdReceive, message } = req.body;

    try {
        await queueService.sendMessage(`${userIdSend}${userIdReceive}`, message); 
    } catch (e) {
        res.status(500).send("Internal server error");
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
