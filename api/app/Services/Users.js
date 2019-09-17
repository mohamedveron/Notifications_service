'use strict'

const userModel = use('App/Models/User');


class Users{

    addUser(user){

      return userModel.create(user);
    }
}

module.exports = Users;
