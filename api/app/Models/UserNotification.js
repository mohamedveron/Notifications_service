/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class UserNotification extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the notification after saving
     * it to the database.
     */
    this.addHook('afterSave', async (eventInstance) => {
      const Notification = use('App/Services/Notification');
      const notificationService = new Notification();

      notificationService.handleNotificationEvent(eventInstance);
    })
  }

}

module.exports = UserNotification
