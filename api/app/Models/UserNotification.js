/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const SMS = use('App/Services/SMS');
const SMSService = new SMS();
const Push = use('App/Services/Socket');
const PushService = new Push();

class UserNotification extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the notification after saving
     * it to the database.
     */
    this.addHook('afterSave', async (userInstance) => {


      // reflection for notification type
      let NotificationsTypeMap = new Map();
      NotificationsTypeMap.set('sms', SMSService);
      NotificationsTypeMap.set('push', PushService);

      NotificationsTypeMap.get(data.type).broadCast(users, msg);
    })
  }

}

module.exports = UserNotification
