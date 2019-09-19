'use strict'

const userModel = use('App/Models/User');


class Users{

    addUser(user){

      return userModel.create(user);
    }

    async getAll(){
      const user = await userModel.find(1)

      const nots = await user
        .notifications()
        .fetch()

      return nots;
    }
}

module.exports = Users;
