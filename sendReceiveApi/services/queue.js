import amqp from "amqplib";

async function sendMessage(queue, message) {
    const connection = await amqp.connect(process.env.RABBITMQ_ROUTE);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    
    channel.sendToQueue(queue, Buffer.from(message))
    console.log("Enviado:", message)

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

async function getAllMessagesFromQueue(queue) {
    const connection = await amqp.connect(process.env.RABBITMQ_ROUTE);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });

    const messages = [];
    let msg;

    do {
        msg = await channel.get(queue, { noAck: true });
        if (msg) {
            messages.push(msg.content.toString());
        }
    } while (msg);

    await channel.close();
    await connection.close();

    return messages;
}

export default {
    sendMessage,
    getAllMessagesFromQueue
}
