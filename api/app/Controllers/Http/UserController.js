'use strict'

const Users = use('App/Services/Users');
const usersService = new Users();

class UserController {

  /**
   * @swagger
   * /users/:
   *   post:
   *     description: Add user to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: Username to use for identify user.
   *         in: body
   *         required: true
   *         type: string
   *       - name: email
   *         description: User's email.
   *         in: body
   *         required: true
   *         type: string
   *       - name: type
   *         description: role of user in the application.
   *         in: body
   *         required: true
   *         type: string
   *       - name: groupId
   *         description: which group the user belong to.
   *         in: body
   *         required: true
   *         type: uint
   *       - name: phone
   *         description: User's email.
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: user added
   */
  async add ({ request, response }) {

    const user = request.post();
    const result = await usersService.addUser(user);

    response.status(200).send(result);
  }


}

module.exports = UserController
