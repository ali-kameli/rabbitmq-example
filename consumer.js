const amqp = require("amqplib");

async function recivedFromProducer() {
  const queueName = "service1";
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.consume(queueName, (msg) => {
    console.log(msg.content.toString());
  });
}

recivedFromProducer();
