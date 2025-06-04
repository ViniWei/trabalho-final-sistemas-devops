import axios from "axios";

async function authenticateUser(req, res, next) {
    const { userId } = req.body;

    try {
        const result = await axios.get(`${process.env.AUTH_API_ROUTE}/token?user=${userId}`, 
            { 
                headers: { Authorization: req.headers.authorization }
            }
        );

        if (!result.data.auth) {
            return res.status(498).send("not auth")
        }
    } catch {
        res.status(500).send("Internal server error")
    }


    next() 
}

export default authenticateUser

