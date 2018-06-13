const systemAdminModel = require('../../models/systemUser')
const Base = require('../base')
/**
 * 管理员模块
 */
class Member extends Base {
    constructor() {
        super()
    }
    /**
     * 
     * @api {method} /admin/system-admin
     * @apiName 会员列表
     * @apiGroup admin
     * @apiVersion  0.1.0
     * 
     * 
     * @apiParam  {String} page 页码
     * @apiParam  {String} page_size 分页条数
     * @apiSuccess (200) {type} name description
     * 
     * @apiParamExample  {type} Request-Example:
     * {
     *     property : value
     * }
     * 
     * 
     * @apiSuccessExample {type} Success-Response:
     * {
     *     property : value
     * }
     * 
     * 
     */
    async list(req, res) {
        let {page, page_size} = req.query
        let result = await systemAdminModel.find(page, page_size)
        res.tools.setJson(0, '', result)
    }
    /**
     * 创建
     */
    async create(req, res) {
        let data = req.body
        try {
            data.username.trim()
            if (!data.username) throw new Error('请输入用户名')
            if (!data.password) throw new Error('请输入密码')
        } catch (error) {
            res.tools.setJson(1, error.message)
        }
        let result = await systemAdminModel.findByUsername(data.username)
        if (result) return res.tools.setJson(1, '用户已存在.')
        systemAdminModel.create(data).then(result => {
            res.tools.setJson(0, '创建成功.')
        })
    }
    /**
     * 删除
     */
    async delete(req, res) {
        const {_id} = req.params
        const user = await systemAdminModel.findById(_id)
        if (!user) return res.tools.setJson(1, '用户不存在.')
        systemAdminModel.removeById(_id)
            .then(result => {
                res.tools.setJson(0, 'remove ok.')
            })
    }
    /**
     * 更新
     */
    async update(req, res) {
        const {_id} = req.params,
              {body} = req
        const user = await systemAdminModel.findById(_id)
        if (!user) return res.tools.setJson(1, '用户不存在.')
        try {            
            let result = await systemAdminModel.updateById(_id, body)
            res.tools.setJson(0, '更新成功.')
        } catch (error) {
            res.tools.setJson(1, error.message)
        }
    }
}

module.exports = new Member()