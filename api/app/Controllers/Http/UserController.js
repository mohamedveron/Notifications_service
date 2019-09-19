'use strict'

const Users = use('App/Services/Users');
const usersService = new Users();


class UserController {

  /**
   * Add new user.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async add ({ request, response }) {

    console.log("hereee");
    const user = request.post();
    const result = await usersService.addUser(user);

    response.status(200).send(result);
  }

  async get ({ request, response }) {

    console.log("hereee");
    const result = await usersService.getAll();

    response.status(200).send(result);
  }


}

module.exports = UserController
