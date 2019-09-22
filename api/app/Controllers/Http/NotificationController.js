'use strict'

const Notification = use('App/Services/Notification');
const notificationService = new Notification();

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
     /* var customersInfo = {};
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


      });*/

    }

}

module.exports = NotificationController
