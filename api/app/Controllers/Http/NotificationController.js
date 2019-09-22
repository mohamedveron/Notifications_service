'use strict'

const SMS = use('App/Services/SMS');
const SMSService = new SMS();
const Push = use('App/Services/Socket');
const PushService = new Push();
const Users = use('App/Services/Users');
const usersService = new Users();
const Notification = use('App/Services/Notification');
const notificationService = new Notification();


const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

class NotificationController {


  /**
   * Add new notification.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async add ({ request, response }) {

    const data = request.post();


    const result = await notificationService.addNotification(data);

    response.status(200).send(result);
  }

    /**
 * start the websocket server.
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async fire ({ request, response }) {


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

  /**
   * notify users.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async notifyUsers ({ request, response }) {

    const data = request.post();

    const msg = 'Your new swvl promo code is 92111 enjoy!';
    const users = await usersService.getUsersByGroup(data.groupId);
    console.log(users);

    let NotificationsTypeMap = new Map();
    NotificationsTypeMap.set('sms', SMSService);
    NotificationsTypeMap.set('push', PushService);

    NotificationsTypeMap.get(data.type).broadCast(users, msg);

  }

  /**
   * notify driver.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async notifyDriver ({ request, response }) {

    const data = request.post();


  }
}

module.exports = NotificationController
