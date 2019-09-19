'use strict'

const SMS = use('App/Services/SMS');
const SMSService = new SMS();
const Push = use('App/Services/Socket');
const PushService = new Push();


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

      let NotificationsTypeMap = new Map();
      Notifications.set('sms', SMSService);
      Notifications.set('push', PushService);

      // NotificationsTypeMap[sms].broadCast(["01117042116', "01065583570]);


      // push notifications part
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
          if (type == 'driver') {
            if (!driversInfo[group]) {
              driversInfo[group] = {};
            }
            driversInfo[group][id] = client;
            console.log(driversInfo);

            // if client is a driver
          } else if (type == 'customer') {
            if (!customersInfo[group]) {
              customersInfo[group] = {};
            }
            customersInfo[group][id] = client;
            console.log(customersInfo);
          }
        });


      });

    }
}

module.exports = NotificationController
