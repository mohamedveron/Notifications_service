'use strict'

const accountSid = 'ACded0aec4d84b8e31ea2ff0614e7d9f45';
const authToken = '64d802c354e47e4ddc5b8107ceeeb508';
const TWILIO_MESSAGING_SERVICE_SID = 'MG4b846c1bb31cc90a5f9cc1d5a1614a3a';
const client = require('twilio')(accountSid, authToken);

const userModel = use('App/Models/User');


class SMS{

  broadCast(numbers){
    numbers = ['+201117042116'];
    const body = 'Your new swvl promo code is 92111 enjoy!';

    // using messaging service to make a pool for all numbers to be sent
    Promise.all(
      numbers.map(number => {
        return client.messages.create({
          to: number,
          from: TWILIO_MESSAGING_SERVICE_SID,
          body: body
        });
      })
    )
      .then(messages => {
        console.log('Messages sent!');
      })
      .catch(err => console.error(err));
  }

}

module.exports = SMS;





