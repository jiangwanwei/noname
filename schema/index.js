import objectIdToTimestamp from 'objectid-to-timestamp'
import mongoose from 'mongoose'
import moment from 'moment'

import mongodb from '../mongodb'
const { Schema } = mongoose

const adminSchema = new Schema({
  username: String,
  password: String,
  avatar: { type: String, default: '/img/default_avatar.jpg' },
  real_name: String,
  token: String,
  updated_at: { type: Date, default: Date.now, }
})

adminSchema.methods.speak = async function () {
  console.log(this.username + '----' + this.password)
  let data = await this.model('admin').find({username: 'admins'}).exec()
  console.log(data)
  return false
}

const admin = mongoose.model('admin', adminSchema, 'adminhaha')  //其中adminhaha为数据库中的collection的名称
const myadmin = new admin({
  username: 'admins',
  password: '123',
})

myadmin.save(function (err, myadmin) {
  if (err) return console.error(err);
  myadmin.speak();
});

// console.log(myadmin.speak())



// const objectIdToTimestamp = require('objectid-to-timestamp')
// const moment = require('moment')

// const config = require('../config')

// const Mongolass = require('mongolass')
// const mongolass = new Mongolass()
// mongolass.connect(
//   config.mongodb, {
//     useNewUrlParser: true,
//   }
// )

// // 根据 id 生成创建时间 created_at
// //* 24 位长的 ObjectId 前 4 个字节是精确到秒的时间戳，所以没有额外的存创建时间（如: createdAt）的字段。
// mongolass.plugin('addCreateAt', {
//   afterFind: results => {
//     results.forEach(item => {
//       item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
//     })
//     return results
//   },
//   afterFindOne: result => {
//     if (result) {
//       result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
//     }
//     return result
//   }
// })

// /**
//  * 系统管理员
//  */
// exports.SystemAdmin = mongolass.model('Admins', {
//   username: { type: 'string', required: true },
//   password: { type: 'string', required: true },
//   avatar: { type: 'string', default: '/img/default_avatar.jpg' },
//   real_name: { type: 'string' },
//   token: { type: 'string' },
//   updated_at: { type: Mongolass.Types.Date, default: new Date() }
// })
// exports.SystemAdmin.index({ username: 1 }, { unique: true }).exec() // 根据用户名找到用户，用户名全局唯一 保证用户名是不重复的

// /**
//  * 网站配置  （网站基本信息）
//  */
// exports.Config = mongolass.model('Configs', {
//   name: { type: 'string', required: true },
//   content: { type: 'string', required: true },
// })
// /**
//  * 商品
//  */
// exports.Products = mongolass.model('Products', {
//   name: { type: 'string', required: true },

// })