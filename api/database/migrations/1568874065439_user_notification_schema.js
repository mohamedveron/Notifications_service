'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserNotificationSchema extends Schema {
  up () {
    this.create('user_notifications', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('notification_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_notifications')
  }
}

module.exports = UserNotificationSchema
