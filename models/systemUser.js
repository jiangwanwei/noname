const {SystemAdmin} = require('../schema')
const {jwt} = require('../common')

module.exports = {
    // 创建管理员
    create: user => {
        user.password = jwt.setMD5(user.password)
        return SystemAdmin.create(user).exec()
    },
    // 根据用户名查找管理员
    findByUsername: username => SystemAdmin.findOne({ username }).exec(),
    // 根据id更新用户
    updateById: (_id, data) => SystemAdmin.update({ _id }, { $set: data }).exec(),
    // 根据token查找用户
    findByToken: token => SystemAdmin.findOne({ token }).exec(),
    // 查找用户列表
    find: () => SystemAdmin.find().exec(),
}