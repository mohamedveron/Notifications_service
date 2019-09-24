'use strict'

const userModel = use('App/Models/User');

class Users{

    addUser(user){

      return userModel.create(user);
    }

    async getUserById(id) {


      const user = await userModel.find(id)

      return user;
    }

  async getUsersByGroup(groupId){

    var users = await userModel.query()
      .where({'groupId': groupId}).fetch();

    return users;
  }

  async getUserByEmail(email){

    var user = await userModel.query()
      .where({'email': email}).fetch();

    return user;
  }


}

module.exports = Users;
