import axios from "axios";

function authenticateUser(req, res, next) {
    axios.get(`http://localhost:9000`, 
        { 
            headers: { Authorization: req.headers.authorization }
        }
    );

    next() 
}

export default authenticateUser

