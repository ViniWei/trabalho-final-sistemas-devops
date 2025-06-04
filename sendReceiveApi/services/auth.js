import axios from "axios";

async function authenticateUser(userId, token) {
    try {
        console.log("userId:", userId)
        const result = await axios.get(`${process.env.AUTH_API_ROUTE}/token?user=${userId}`, 
            { 
                headers: { Authorization: token }
            }
        );

        console.log("result.data:", result.data);
        return result.data.auth;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export default { authenticateUser };
