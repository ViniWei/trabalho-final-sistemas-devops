import express from "express";
import messageController from "./controllers/message.js";
import authenticateUser from "./authMiddleware.js";

const port = 3000;
const app = express();

app.use(express.json());

app.post("/message", authenticateUser, messageController.sendMessage);
app.post("/message/worker", authenticateUser, messageController.sendMessage);

app.listen(port, () => {console.log("Listening on port:", port)} );
