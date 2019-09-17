'use strict'
const accountSid = 'ACded0aec4d84b8e31ea2ff0614e7d9f45';
const authToken = '64d802c354e47e4ddc5b8107ceeeb508';
const TWILIO_MESSAGING_SERVICE_SID = 'MG4b846c1bb31cc90a5f9cc1d5a1614a3a';
const client = require('twilio')(accountSid, authToken);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

class NotificationController {

    /**
 * notify users.
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async notify ({ request, response }) {

      wss.on('connection', function connection(ws) {

        console.log("hereeeee");
        ws.on('message', function incoming(message) {
          console.log('received: %s', message);
        });

        ws.send('something');
      });
  const numbers = ['+201117042116'];
  const body = 'Your new swvl promo code is 92111 enjoy!';

  // using
  Promise.all(
    numbers.map(number => {
      return client.messages.create({
        to: number,
        from: TWILIO_MESSAGING_SERVICE_SID,
        body: body
      });
    })
  )
    .then(messages => {
      console.log('Messages sent!');
    })
    .catch(err => console.error(err));
}

}

module.exports = NotificationController
