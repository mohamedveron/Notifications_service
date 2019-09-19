'use strict'
const accountSid = 'ACded0aec4d84b8e31ea2ff0614e7d9f45';
const authToken = '64d802c354e47e4ddc5b8107ceeeb508';
const TWILIO_MESSAGING_SERVICE_SID = 'MG4b846c1bb31cc90a5f9cc1d5a1614a3a';
///const client = require('twilio')(accountSid, authToken);
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


      var customersInfo = {};
      var driversInfo = {};

      wss.on('connection', function connection(client) {

        client.send('something');

        client.on('message', function (data) {
          var info = data.split(';');

          var group = info[0];
          var id = info[1];
          var type = info[2];

          // if client is a customer
          if(type == 'driver'){
            if(!driversInfo[group]){
              driversInfo[group] = {};
            }
            driversInfo[group][id] = client;
            console.log(driversInfo);

            // if client is a driver
          }else if(type == 'customer'){
            if(!customersInfo[group]){
              customersInfo[group] = {};
            }
            customersInfo[group][id] = client;
            console.log(customersInfo);
          }
        });


      });


 /* const numbers = ['+201117042116'];
  const body = 'Your new swvl promo code is 92111 enjoy!';

  // using messaging service to make a pool for all numbers to be sent
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
    .catch(err => console.error(err));*/
}

}

module.exports = NotificationController
