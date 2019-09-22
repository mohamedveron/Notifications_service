'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

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
