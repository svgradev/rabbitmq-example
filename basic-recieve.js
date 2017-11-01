'use strict';

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://E0kIh0QqGrEXBbn2:xjRzpJbmcfT1SoxY@localhost:5672', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});