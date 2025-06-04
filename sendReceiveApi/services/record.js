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

export default {
    storeMessages
}
