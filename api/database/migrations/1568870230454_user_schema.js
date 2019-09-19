'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 20).notNullable().unique()
      table.string('email', 80).notNullable().unique()
      table.string('type', 20).notNullable()
      table.integer('groupId').notNullable()
      table.string('phone', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
