'use strict';

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://E0kIh0QqGrEXBbn2:xjRzpJbmcfT1SoxY@localhost:5672', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q);
    ch.consume(q, (msg) => {
      const secs = msg.content.toString().split('.').length - 1;
      console.log(msg);  
      console.log(' [x] Received %s', msg.content.toString());
      setTimeout(() => {
        console.log(' [x] Done');
        ch.ack(msg);
        console.log(msg);
      }, secs * 1000);
    }, {noAck: false});
  });
});