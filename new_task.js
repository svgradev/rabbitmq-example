'use strict';

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://E0kIh0QqGrEXBbn2:xjRzpJbmcfT1SoxY@localhost:5672', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'task_queue';
    const msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
    console.log(' [x] Sent %s ', msg);
  });
  setTimeout(() => { conn.close(); process.exit(0) }, 500);
});