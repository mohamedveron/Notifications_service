const { ServiceProvider } = require('@adonisjs/fold')

class SocketProvider extends ServiceProvider {
  register () {
    this.app.singleton('WSocket', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}

module.exports = SocketProvider
