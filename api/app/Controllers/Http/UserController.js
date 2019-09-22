'use strict'

const Users = use('App/Services/Users');
const usersService = new Users();
const socket = use('WSocket');


class UserController {

  /**
   * Add new user.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async add ({ request, response }) {

    const user = request.post();
    const result = await usersService.addUser(user);

    response.status(200).send(result);
  }


}

module.exports = UserController
