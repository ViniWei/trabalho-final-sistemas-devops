import amqp from "amqplib";

async function sendMessage(queue, message) {
    const connection = await amqp.connect("amqp://rabbitmq:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    
    channel.sendToQueue(queue, Buffer.from(message))
    console.log("Enviado:", message)

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

export default {
    sendMessage
}
