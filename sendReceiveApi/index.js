import express from "express";
import messageController from "./controllers/message.js";

const port = 3000;
const app = express();

app.use(express.json());

app.post("/message", messageController.sendMessage);
app.post("/message/worker", messageController.messageWorker);

app.get("/message/", messageController.getAllMessagesByAUser);

app.listen(port, () => {console.log("Listening on port:", port)} );
