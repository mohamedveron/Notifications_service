'use strict'

const notificationModel = use('App/Models/Notification');
const userNotificationModel = use('App/Models/UserNotification');
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

}

module.exports = Notification;
