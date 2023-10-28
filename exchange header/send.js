const amqp = require("amqplib");

const exchangeName = "headersMessage";
const [logtype, message] = process.argv.slice(2);

const sendData = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "headers");
  channel.publish(exchangeName, "", Buffer.from("any message:"), { headers: {
    author: "ali",
    runtime: "nodejs",
    price: 997,
    comments: []
  } });
  setTimeout(() => {
    process.exit(0);
  });
};
sendData();
