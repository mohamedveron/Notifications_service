'use strict'

const userModel = use('App/Models/User');
const socket = use('WSocket');

class Socket{

  broadCast(user, msg){

    if(user.type === 'customer'){
      socket.getClient(user.groupId, user.id).send(msg);
    }else{
      socket.getDriver(user.groupId, user.id).send(msg);
    }

  }
}

module.exports = Socket;
