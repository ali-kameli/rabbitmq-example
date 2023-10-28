const amqp = require("amqplib");

const exchangeName = "directMessage";
const logtype = process.argv.slice(2); //? error, info, warning
console.log(logtype);

const reciveData = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "direct");
  const assertQueue = await channel.assertQueue("", { exclusive: true });
  for (const pattern of logtype) {
    channel.bindQueue(assertQueue.queue, exchangeName, pattern);
  }
  channel.consume(assertQueue.queue, (msg) => {
    console.log(msg.content.toString());
  });
};
reciveData();
