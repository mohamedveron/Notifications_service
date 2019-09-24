'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.httpServer(() => {
  const socket = use('WSocket');
})
