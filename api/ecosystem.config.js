const env = process.env.NODE_ENV;

const devOptions = {
  watch: ['app', 'config', 'database', 'start', 'ace', 'server.js'],
  ignore_watch: ['node_modules']
};

const prodOptions = {
  instances: "max",
  autorestart: true
};

module.exports = {
  apps: [
    {
      name: "Notifications",
      script: "./server.js",
      ...(env === 'production' ? prodOptions : devOptions)
    }
  ]
}