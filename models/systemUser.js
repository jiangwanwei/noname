// const { SystemAdmin } = require('../schema')
// const { jwt } = require('../common')

// SystemAdmin.plugin('deleteToken', {
//   afterFind: result => {
//     result.forEach(item => {
//       delete item.token
//     })
//     return result
//   }
// })
// module.exports = {
//   // 创建管理员
//   create: user => {
//     user.password = jwt.setMD5(user.password)
//     return SystemAdmin.create(user).exec()
//   },
//   // 根据用户名查找管理员
//   findByUsername: username => SystemAdmin.findOne({ username }).exec(),
//   // 根据id更新用户
//   updateById: (_id, data = {}) => {
//     for (let k in data) {
//       if (Object.keys(SystemAdmin._schema._children).indexOf(k) === -1) delete data[k]
//       if (k === 'password') {
//         data.password = jwt.setMD5(data.password)
//       }
//     }
//     return SystemAdmin.update({ _id }, { $set: data }).exec()
//   },
//   // 根据token查找用户
//   findByToken: token => SystemAdmin.findOne({ token }).exec(),
//   // 查找用户列表
//   find: (page = 1, page_size = 20) => {
//     page = parseInt(page)
//     page_size = parseInt(page_size)
//     if (isNaN(page)) page = 1
//     if (isNaN(page_size)) page = 20
//     page -= 1
//     return SystemAdmin.find().limit(page_size).skip(page * page_size).deleteToken().exec().then(async result => {
//       let total = await SystemAdmin.count().exec()
//       return {
//         data: result,
//         total,
//       }
//     })
//   },
//   // 根据id删除用户
//   removeById: _id => SystemAdmin.remove({ _id }).exec(),
//   // 根据id查找用户
//   findById: _id => SystemAdmin.findOne({ _id }).exec(),
// }