const router = require('express').Router()

const SystemAdminController = require('./systemAdmin')
const MarketingController = require('./marketing')

const SystemAdminModel = require('../../models/systemUser')
const {superAdmin} = require('../../config')

class Admin {
    constructor(app, authMiddleware, path) {
        app.use(path, router)
        // router.use(...authMiddleware)
        Object.assign(this, { app, path, authMiddleware, })
        this.initRouter()
        this.createSuperAdmin()
    }
    /**
     * 注册路由
     */
    initRouter() {        
        // 登陆
        router.post('/sign-in', this.signIn)
        // 会员
        router.get('/system-admin',    ...this.authMiddleware, SystemAdminController.list)
              .post('/system-admin',   ...this.authMiddleware, SystemAdminController.create)
              .put('/system-admin/:_id',    ...this.authMiddleware, SystemAdminController.update)
              .delete('/system-admin/:_id', ...this.authMiddleware, SystemAdminController.delete)
        // 营销
        router.get('/marketing', MarketingController.list)
    }
    /**
     * 创建超级管理员
     */
    createSuperAdmin() {
        SystemAdminModel.findByUsername(superAdmin.username)
            .then(u => {
                if (!u) SystemAdminModel.create(superAdmin)
            })
    }
    /**
     * 
     * @api {post} /admin/sign-in 登陆
     * @apiName 登陆接口
     * @apiGroup admin
     * @apiVersion  0.1.0
     * 
     * 
     * @apiParam  {String} username 用户名
     * @apiParam  {String} password 密码
     * 
     * @apiSuccess (200) {type} name description
     * 
     * @apiParamExample  {type} Request-Example:
     * {
     *     username : 'admin',
     *     password : 'admin'
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
    signIn(req, res) {
        let user = {
            username: req.body.username,
            password: req.body.password,
        }
        if (!user.password || !user.username) return res.tools.setJson(1, '请输入用户名密码.')
        SystemAdminModel.findByUsername(user.username)
            .then(u => {
                if (!u) return res.tools.setJson(1, '用户不存在.')
                if (u.password !== res.jwt.setMD5(user.password)) return res.tools.setJson(1, '用户名密码有误.')
                delete u.password
                delete u.token
                let token = res.jwt.setToken(u)
                SystemAdminModel.updateById(u._id, { token })
                    .then(result => {
                        res.tools.setJson(0, null, { token: 'Bearer ' + token })
                    })                
            })
    }
}
module.exports = Admin