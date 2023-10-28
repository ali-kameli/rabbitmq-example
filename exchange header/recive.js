const amqp = require("amqplib");

const exchangeName = "headersMessage";

const reciveData = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "headers");
  const assertQueue = await channel.assertQueue("", { exclusive: true });
  channel.bindQueue(assertQueue.queue, exchangeName, "", {
    author: "ali",
    runtime: "nodejs",
    'x-match': 'all', //? &&
    // 'x-match': 'any', //? ||
  });
  channel.consume(assertQueue.queue, (msg) => {
    console.log(msg.content.toString());
    console.log(msg.properties.headers);
  });
};
reciveData();
