'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 *  @swagger
 *  definitions:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: uint
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        type:
 *          type: string
 *        groupId:
 *          type: uint
 *        phone:
 *          type: string
 *      required:
 *        - username
 *        - email
 *        - type
 */

class User extends Model {
  static boot () {
    super.boot()

  }

  notifications () {
    return this.belongsToMany('App/Models/Notification')
                .pivotModel('App/Models/UserNotification')
  }
}

module.exports = User
