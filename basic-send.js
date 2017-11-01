'use strict';

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://E0kIh0QqGrEXBbn2:xjRzpJbmcfT1SoxY@localhost:5672', (err, conn) => {
    console.log(err);
    conn.createChannel( (err, ch) => {
        const q = 'hello';
        let msg = `Hello World!`
        ch.assertQueue(q, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer(msg));
        console.log(`[x] Sent ${msg}`);

    });


setTimeout(() => { conn.close(); process.exit(0) }, 500);
});
