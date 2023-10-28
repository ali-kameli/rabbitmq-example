const amqp = require("amqplib");

const exchangeName = "directMessage";
const [logtype, message] = process.argv.slice(2);

const sendData = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "direct");
  channel.publish(
    exchangeName,
    logtype,
    Buffer.from(message)
  );
  setTimeout(() => {
    process.exit(0);
  }, 1000);
};
sendData();
