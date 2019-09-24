/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 *  @swagger
 *  definitions:
 *    Notification:
 *      type: object
 *      properties:
 *        id:
 *          type: uint
 *        type:
 *          type: string
 *        description:
 *          type: string
 *      required:
 *        - type
 *        - description
 */

class Notification extends Model {
  static boot () {
    super.boot()

  }

}

module.exports = Notification
