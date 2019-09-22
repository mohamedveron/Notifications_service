'use strict'
const WebSocket = require('ws');

let _customersInfo = {};
let _driversInfo = {};

class Socket{


  constructor (Config) {

    this.Config = Config;
    this.wss = new WebSocket.Server({ port: 8080 });

    this.wss.on('connection', function connection(client) {

      client.send('something');

      client.on('message', function (data) {
        var info = data.split(';');

        var group = info[0];
        var id = info[1];
        var type = info[2];

        // if client is a customer
        if(type == 'driver'){
          if(!_driversInfo[group]){
            _driversInfo[group] = {};
          }
          _driversInfo[group][id] = client;
          console.log(_driversInfo);

          // if client is a driver
        }else if(type == 'customer'){
          console.log(_customersInfo);
          if(!_customersInfo[group]){
            _customersInfo[group] = {};
          }
          _customersInfo[group][id] = client;
          console.log(_customersInfo);
        }
      });


    });

  }


  getClient (group, id) {

    /**
     * Return the instance back
     */
    return _customersInfo[group][id];
  }

  getDriver (group, id) {

    /**
     * Return the instance back
     */
    return _driversInfo[group][id];
  }
}

module.exports = Socket
