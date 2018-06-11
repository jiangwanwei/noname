const systemAdminModel = require('../../models/systemUser')
/**
 * 会员模块
 */
class Member {
    constructor() {

    }
    /**
     * 会员列表
     */
    async list(req, res) {
        let result = await systemAdminModel.find()
        res.tools.setJson(0, '', result)
    }
    /**
     * 创建
     */
    async create(req, res) {
        let data = req.body
        data.username.trim()
        try {
            if (!data.username) throw '请输入用户名'
            if (!data.password) throw '请输入密码'
        } catch (error) {
            res.tools.setJson(1, error)
        }
        let result = await systemAdminModel.findByUsername(data.username)
        if (result) return res.tools.setJson(1, '用户已存在.')
        systemAdminModel.create(data).then(result => {
            console.log(result)
            res.tools.setJson(0, '创建成功.')
        })
    }
    /**
     * 删除
     */
    delete(req, res) {
        res.json({
            path: '/admin/member delete'
        })
    }
    /**
     * 更新
     */
    update(req, res) {
        res.json({
            path: '/admin/member update'
        })
    }
}

module.exports = new Member()