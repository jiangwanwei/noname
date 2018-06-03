const router = require('express').Router()

const MemberController = require('./member')
const MarketingController = require('./marketing')

const AdminModel = require('../../models/admin')
const {superAdmin} = require('../../config')

class Admin {
    constructor(app, middleware, path) {
        app.use(path, ...middleware, router)
        Object.assign(this, { app, path, })
        this.init()
        this.createSuperAdmin()
    }
    /**
     * 注册路由
     */
    init() {        
        // 登陆
        router.post('/sign-in', this.signIn)
        // 会员
        router.get('/member', MemberController.list)
              .post('/member', MemberController.create)
              .put('/member', MemberController.update)
              .delete('/member', MemberController.delete)
        // 营销
        router.get('/marketing', MarketingController.list)
    }
    /**
     * 创建超级管理员
     */
    createSuperAdmin() {
        AdminModel.findByUsername(superAdmin.username)
            .then(u => {
                if (!u) AdminModel.create(superAdmin)
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
        AdminModel.findByUsername(user.username)
            .then(u => {
                if (!u) return res.tools.setJson(1, '用户不存在.')
                if (u.password !== res.jwt.setMD5(user.password)) return res.tools.setJson(1, '用户名密码有误.')
                delete u.password
                delete u.token
                let token = res.jwt.setToken(u)
                AdminModel.updateById(u._id, { token })
                    .then(result => {
                        res.tools.setJson(0, null, { token: 'Bearer ' + token })
                    })                
            })
    }
}
module.exports = Admin