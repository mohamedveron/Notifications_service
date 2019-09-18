'use strict'
const WebSocket = require('ws');

class Socket{

  constructor (Config) {

    this.Config = Config;
    this.wss = new WebSocket.Server({ port: 8080 });
    this._customersInfo = {};
    this._driversInfo = {};

    wss.on('connection', function connection(client) {

      client.send('something');

      client.on('message', function (data) {
        var info = data.split(';');

        var group = info[0];
        var id = info[1];
        var type = info[2];

        // if client is a customer
        if(type == 'driver'){
          if(!this._driversInfo[group]){
            this._driversInfo[group] = {};
          }
          this._driversInfo[group][id] = client;
          console.log(this._driversInfo);

          // if client is a driver
        }else if(type == 'customer'){
          if(!this._customersInfo[group]){
            this._customersInfo[group] = {};
          }
          this._customersInfo[group][id] = client;
          console.log(this._customersInfo);
        }
      });


    });

  }


  get (name) {

    /**
     * Return the instance back
     */
    return this._customersInfo[name]
  }
}

module.exports = Socket
