/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Notification extends Model {
  static boot () {
    super.boot()

  }

}

module.exports = Notification
