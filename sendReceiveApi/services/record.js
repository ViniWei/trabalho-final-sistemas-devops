import axios from "axios";

async function storeMessages(userIdSend, userIdReceive, messages) {
    for (const message of messages) {
        const body = {
            userIdSend,
            userIdReceive,
            message
        }
         
        await axios.post(`${process.env.RECORD_API_ROUTE}/message`, body);
    } 
}

async function getAllMessagesByUser(userId) {
    const result = await axios.get(`${process.env.RECORD_API_ROUTE}/messages/${userId}`);
    return result.data;
}

export default {
    storeMessages,
    getAllMessagesByUser
}
