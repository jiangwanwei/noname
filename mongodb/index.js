const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('../config')

// 连接数据库
mongoose.connect(
  config.mongodb,
  {
    useNewUrlParser: true,
    // auth: {
    //   user: config.dbUserName,
    //   password: config.dbUserPassword,
    // },
    // authSource:'admin',   // 用户所在的数据库
  }
)

mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => {
  console.log(chalk.green('MongoDB connect success.'))
})

db.once('error', error => {
  console.error(chalk.red('Error in MongoDb connection: ' + error))
  mongoose.disconnect()
})

db.once('close', () => {
  console.log(chalk.red(`MongoDB disconnect, please reconnect.`))
  mongoose.connect(
    config.mongodb,
    {
      server: {
        auto_reconnect:true,
      }
    }
  )
})

export default db