'use strict'

const Notification = use('App/Services/Notification');
const notificationService = new Notification();

class NotificationController {


  /**
   * @swagger
   * /notification/:
   *   post:
   *     description: Add notification event to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: type
   *         description: type of notification to be sent.
   *         in: body
   *         required: true
   *         type: string
   *       - name: email
   *         description: user email who will receive the notification.
   *         in: body
   *         required: true
   *         type: uint
   *       - name: description
   *         description: notification message.
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: user added
   */

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
   * @swagger
   * /notification/group:
   *   post:
   *     description: Add notification event to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: type
   *         description: type of notification to be sent.
   *         in: body
   *         required: true
   *         type: string
   *       - name: groupId
   *         description: which group of users which the notification will be sent to.
   *         in: body
   *         required: true
   *         type: uint
   *       - name: description
   *         description: notification message.
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: user added
   */

  /**
   * Add new group notification.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async addGroup ({ request, response }) {

    const data = request.post();


    const result = await notificationService.addGroupNotification(data);

    response.status(200).send(result);
  }

}

module.exports = NotificationController
