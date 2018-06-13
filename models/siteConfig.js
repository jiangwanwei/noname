const {Config} = require('../schema')

module.exports = {
    // 创建一条配置
    create: data => Config.create(data).exec(),
    // 根据名称查找配置
    findByName: name => Config.findOne({ name }).exec(),
    // 更新一条配置
    update: (name, content) => Config.update({ name }, { $set: { content }}).exec(),
}