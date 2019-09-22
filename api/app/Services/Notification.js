'use strict'

const notificationModel = use('App/Models/Notification');
const userNotificationModel = use('App/Models/UserNotification');
const SMS = use('App/Services/SMS');
const SMSService = new SMS();
const Push = use('App/Services/Socket');
const PushService = new Push();
const Users = use('App/Services/Users');
const usersService = new Users();



class Notification{

  async addNotification(data){


    const noti = {
      "type": data.type,
      "description": data.description
    };

    const notification = await notificationModel.create(noti);

    const res = await usersService.getUsersByGroup(data.groupId);
    const users = res.toJSON();

    for(var i in users){
      this.addUserNotification(users[i].id, notification.id);
    }


  }

  addUserNotification(user_id, noti_id){

    const obj = {
      "user_id": user_id,
      "notification_id": noti_id
    };

    return userNotificationModel.create(obj);
  }


  async getNotificationById(id) {


    return await notificationModel.find(id)

  }


  async handleNotificationEvent(eventInstance){


    const user = await usersService.getUserById(eventInstance.user_id);
    const notification = await this.getNotificationById(eventInstance.notification_id);

    // reflection for notification type to avoid if conditions
    let NotificationsTypeMap = new Map();
    NotificationsTypeMap.set('sms', SMSService);
    NotificationsTypeMap.set('push', PushService);

    NotificationsTypeMap.get(notification.type).broadCast(user, notification.description);
  }

}

module.exports = Notification;
